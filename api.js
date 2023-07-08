const API = 'http://10.0.2.2:8000/users';

export const Login =  async (user) => {
  const res = await fetch( API+"/auth" , {
    method: 'POST', 
    headers: {Accept: 'application/json', "Content-Type": 'application/json'},
    body: JSON.stringify(user)
  });
  return await res.json()
}

export const createUser = async (user) =>{
  const res = await fetch( API+"/create", {
    method:'POST',
    headers: {Accept:'application/json', "Content-Type":'application/json'},
    body: JSON.stringify(user)
  });
  return await res.json();
}
