// GET: get data from the server like viewing a webpage, no change to resource
// ✓ Correct! Also: safe, idempotent, can be cached

// POST: create a new resource like new account, new user, new product
// ✓ Correct! Also: not idempotent (multiple POSTs = multiple resources)

// PUT: fully update a resource like changes in everything
// ✓ Correct! You send the complete updated resource. Idempotent.

// DELETE: delete a resource from the db or server
// ✓ Correct! Idempotent (deleting twice has same effect as once)

// PATCH: update a resource partially
// ✓ Correct! Only send the fields you want to change

// OPTIONS: describe the communication options like CORS
// ✓ Correct! Returns allowed methods (GET, POST, etc.) and CORS headers

// HEAD: get the headers from the server (basically kind of metadata)
// ✓ Correct! Same as GET but no response body - useful for checking 
//   if resource exists, getting file size, last-modified date, etc.

// PUT vs PATCH: If you're updating a user's email, PATCH sends {email: "new@email.com"}, but PUT requires sending the entire user object {name, email, age, address, ...}