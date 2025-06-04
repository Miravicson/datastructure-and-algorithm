class Employee {
    id;
    name;
    dept;
    city;
    constructor(id, name, dept, city) {
        this.id = id;
        this.name = name;
        this.dept = dept;
        this.city = city;
    }
    writDept() {
        console.log(`${this.name} works in ${this.dept}`);
    }
    get location() {
        switch (this.city) {
            case 'Paris':
                return 'France';
            case 'London':
                return 'UK';
            default:
                return this.city;
        }
    }
    get details() {
        return `${this.name}, ${this.dept}, ${this.location}`;
    }
    #salary_accessor_storage = 100_000;
    get salary() { return this.#salary_accessor_storage; }
    set salary(value) { this.#salary_accessor_storage = value; }
}
let salesEmployee = new Employee('fvega', 'Fidel Vega', 'Sales', 'Paris');
salesEmployee.writDept();
console.log(`Location: ${salesEmployee.location}`);
console.log(`Details: ${salesEmployee.details}`);
console.log(`Salary: ${salesEmployee.salary}`);
