export async function api<T>(url: string, requestOptions?: RequestInit): Promise<T> {
  return await fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
}