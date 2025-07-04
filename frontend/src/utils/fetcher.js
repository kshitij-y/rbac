const uri =
  import.meta.env.VITE_API_URL ||
  "http://ec2-13-61-14-231.eu-north-1.compute.amazonaws.com:3000";

async function fetcher(endpoint, options = {}) {
  if (!uri) {
    throw new Error("VITE_API_URL is not defined in environment variables");
  }

  try {
    const res = await fetch(`${uri}${endpoint}`, options);
    return await res.json();
  } catch (err) {
    console.error("❌ Fetcher Error:", err.message);
    throw err;
  }
}

export default fetcher;