function contact(name, email, DOB, siblings) {
  this.name = name;
  this.email = email;
  this.DOB = DOB;
  this.siblings = siblings;
  this.age = function (DOB) {
    return 2022 - this.DOB;
  };
}
let ewan = new contact("Ewan Tanner", "ewan.tanner@hotmail.com", 2005, [
  "Loan Tanner",
]);

console.log(ewan.name);
console.log(ewan.age());
console.log(ewan.email);
console.log(ewan.DOB);
console.log(ewan.siblings);
