curl "https://pokemon-nextjs-dq8ojp74b-dipsyxx.vercel.app/api/revalidate" \
  -X POST \
  -H "Content-Type: appliaction/json" \
  -d "[\"/pokemon/1\"]"
