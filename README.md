# [jobseekr.dev](jobseekr.dev) frontend (Senior Project)

## Application Outline ( to be revised )

Users are authenticated against [supabase](https://supabase.com/) using SSO with Google. Once users are authenticated, they are allowed to interact with the application by updating their skills, preferences, uploading their resume, and look through job openings that best match their skills/experience level/preferences.

The whole application consists of:

- authentication service (supabase in this case)
- emailing service (tbd, I think supabase can do this)
- domain service ([name.com](https://www.name.com/account))
- hosting service ([heroku](https://www.heroku.com/))
- job scraping service ([the backend](https://github.com/andr3i-f/job-seekr-finder-api))
- resume parsing service (the backend)

## Local Development

1. Ensure a development Supabase project is set up
2. Clone and set up the [backend repository](https://github.com/andr3i-f/job-seekr-finder-api)
3. In the backend repository, run:

```bash
~/dev/sp/job-seekr-finder-api main ❯ docker compose up -d --build                                                                                   08:55:32 PM
Compose now can delegate build to bake for better performances
Just set COMPOSE_BAKE=true
[+] Building 1.0s (23/23) FINISHED
...
```

then enter the backend container

```bash
~/dev/sp/job-seekr-finder-api main ❯ docker compose exec backend bash                                                                               08:55:36 PM

root@19ef24410c42:/build#
```

and run supervisord:

```bash
root@19ef24410c42:/build# supervisord -n
```

4. Back to the frontend, clone the repository
5. Copy .env.example to .env
6. run:

```bash
~/dev/sp/job-seekr-senior-proj updating-readme !1 ❯ make buildRunDev                                                                                08:50:35 PM
make buildDev
docker build -t job-seekr-frontend -f ./.docker/development.dockerfile .
[+] Building 3.1s (8/9)
...
```

and start the server

```bash
root@de8d38c6cdda:/app# npm run dev

> job-seekr-senior-proj@0.1.0 dev
> next dev
```

### Formatting

In the container run:

```bash
npm run format
```
