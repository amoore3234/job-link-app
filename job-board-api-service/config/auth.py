import os
import httpx

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2AuthorizationCodeBearer
from jose import jwt, jwk
from jose.exceptions import JWTError

KEYCLOAK_URL = os.getenv("KEYCLOAK_URL")
KEYCLOAK_REALM = os.getenv("KEYCLOAK_REALM")
KEYCLOAK_CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID_API")

JWKS_URL = f"http://job-board-keycloak:8080/realms/{KEYCLOAK_REALM}/protocol/openid-connect/certs"

oauth2_schema = OAuth2AuthorizationCodeBearer(
    authorizationUrl=f"{KEYCLOAK_URL}/realms/{KEYCLOAK_REALM}/protocol/openid-connect/auth",
    tokenUrl=f"{KEYCLOAK_URL}/realms/{KEYCLOAK_REALM}/protocol/openid-connect/token",
    auto_error=False
)

async def validate_token(token: str = Depends(oauth2_schema)):
    if token is None:
        return None
    try:
        # Fetch JWKS
        async with httpx.AsyncClient() as client:
            response = await client.get(JWKS_URL)
            response.raise_for_status()
            jwks = response.json()
            print(f"JWKS fetched successfully: {jwks}")

        print(f"Token received: {token}")
        # Decode the token headers to get the key ID (kid)
        headers = jwt.get_unverified_headers(token)
        kid = headers.get("kid")
        if not kid:
            raise HTTPException(status_code=401, detail="Token missing 'kid' header")

        # Find the correct key in the JWKS
        key_data = next((key for key in jwks["keys"] if key["kid"] == kid), None)
        if not key_data:
            raise HTTPException(status_code=401, detail="Matching key not found in JWKS")

        # Convert JWK to RSA public key
        public_key = jwk.construct(key_data).public_key()

        decoded_token = jwt.decode(
            token,
            key=public_key,
            algorithms=["RS256"],
            audience=KEYCLOAK_CLIENT_ID,
            options={"verify_exp": True},
            issuer=f"{KEYCLOAK_URL}/realms/{KEYCLOAK_REALM}"
        )
        return decoded_token
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

def RoleRequired(required_role: str):
    async def role_checker(user_payload: dict = Depends(validate_token)):
        user_roles = user_payload.get("realm_access", {}).get("roles", [])

        if required_role not in user_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"User does not have the required role: '{required_role}'"
            )
        # If the user has the role, the dependency passes, and the endpoint runs.
        return user_payload

    return role_checker

# Dependency to get the current user
async def get_current_user(token: str = Depends(oauth2_schema)):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return await validate_token(token)
