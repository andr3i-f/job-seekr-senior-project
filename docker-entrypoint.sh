#!/bin/bash

set -e

ENV_VARS=("NEXT_PUBLIC_SUPABASE_URL" "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" "NEXT_PUBLIC_CLIENT_ID" "NODE_ENV" "PORT" "RESEND_KEY")

for var_name in "${ENV_VARS[@]}"; do
    if [[ -z "${!var_name}" ]]; then
        echo "Error: Environment variable '$var_name' must be set"
        exit 1
    fi
done

npm run start