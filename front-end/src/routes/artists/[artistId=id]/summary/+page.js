export async function load({ fetch, params }) {
  const res = await fetch(`http://localhost:3000/artists/${params.artistId}/summary`,{
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });
  const item = await res.json();
  console.log(item);

  return {
    list: item
  };
}