const uri = import.meta.env.VITE_API_URL;

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