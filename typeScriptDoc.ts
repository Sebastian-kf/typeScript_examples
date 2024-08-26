// implicit type //////////////////////////////////////////////////
let myNumber = 2
myNumber = 3

let myString = "Hello, World!"
myString = "this is a string"

// explicit type ///////////////////////////////////////////////////////////
let varNumber:number = 2
varNumber = 24

let myAnythingVar: any = "stuff"
myAnythingVar = true

// array of types //////////////////////////////////////////////////////////////////////////////////////////
// implicit array
const myList = ['Harry Potter', 'Jurrasic Park', 'Goodnight moon']

// explicit array 
const books:string[] = ['Harry Potter', 'Jurrasic Park', 'Goodnight moon']
books.push('the Lord of the Rings')
console.log('explicit array', books)

// implicit function ///////////////////////////////////////////////////////////////////////////////
function sumof(x,y){
   return x + y
}

console.log('implicit function', sumof('2', 2))

// explicit function //////////////////////////////////////////////////////////////////////////////
function sum(x: number, y:  number): number {
   return x + y
}

console.log('explicit function', sum(2, 2))

// destructured function ///////////////////////////////////////////////////////////////////////////
function sums({x, y}: {x: number, y:  number}): number {
   return x + y
}

console.log('destructured function', sums({x: 2, y: 2}))

// void type function ////////////////////////////////////////////////////////////////////////////////
function log(value: any): void{ //returns nothing
    console.log('This returns nothing',value)
}

// optional parameter //////////////////////////////////////////////////////////////////////////
function greet(name? : string){
    if (name){
        console.log(`Hello ${name}`)
    }else{
        console.log('Hello Stranger')
    }
}

greet('some random name')

// union type /////////////////////////////////////////////////////////////////////////////////////////
let booleanOrString: boolean | string = 'I can change'
booleanOrString = true

function printId(id: number | string){
    if (typeof id === 'string'){
        console.log("Upper case string", id.toUpperCase())
    }else{
        console.log('id number', id)
    }
}

console.log(printId("stuff"))

// union types alias
type Sizes = 'small' | 'medium' | 'Large'
function setProductSize(size: Sizes){
    //...
}
setProductSize('small')

type Product = {
    name: string,
    price: number,
}

const tshirt :Product = {
    name: 'T-shirt string',
    price: 123465,
}

// interface /////////////////////////////////////////////////////////////////////////////
interface Products  {
    name: string,
    price: number,
}
interface Products {
    colour?: string
}

const shirts :Products = {
    name: 'T-shirt string',
    price: 123465,
}

// extend interface
interface Invetory {
    name: string,
    price: number,
}
interface SampleProduct extends Invetory {
    colour?: string,
}
interface Service extends Invetory {
    startTime: Date,
    endTime: Date,
}

const jackets :SampleProduct = {
    name: 'T-shirt string',
    price: 123465,
}
const photoShoot : Service = {
    startTime: new Date('22 May 2024'),
    endTime:  new Date('22 May 2024'),
    name: 'something to do',
    price: 9874565320,
}

// interface in functions
function purchaseItem(item: Invetory) {
    console.log(item.price)
}
purchaseItem({
    name: 'first item',
    price: 4,
})

function purchaseItems(item: Invetory) : Invetory /*define returned object shape*/{
    console.log(item.price)
    return item
}
purchaseItem(photoShoot)
// Enums /////////////////////////////////////////////////////////////////////////////////////////////
// numeric enum
enum sizes { 
    small, //0
    medium, //1
    large, //2
}
console.log(sizes.small)

function productSize(size: sizes){}
productSize(sizes.medium)

console.log(sizes)
// string literal enum
enum fit {
    small = 'small',
    medium = 'medium',
    large = 'large'
}
console.log(fit)
// heterogenous enum
enum kitSize { 
    small,
    medium = 'medium',
    large = 'large'
}
console.log(kitSize)

// classes //////////////////////////////////////////////////////////////////
enum Build { 
    small = 'petite',
    medium = 'middle',
    large = 'extra'
}

class sampleSize {
    name: string
    price: number
    colour: string = 'grey'
    size: Build | undefined // size?: Build

    constructor(name: string, price: number){
        this.name = name
        this.price = price
    }

    buy(): this{ // method
        console.log(this.price)
        return this
    }
}

const jersey = new sampleSize('some name from somewhere', 12)
jersey.size = Build.medium
jersey.colour = 'blue'
jersey.buy()

interface Emailable { //method must contain emailBody and emailSubject functions that return strings
    emailBody(): string, 
    emailSubject(): string,
}

// extending classes
class InvetoryItem {
    name: string
    price: number

    constructor(name: string, price: number){
        this.name = name
        this.price = price
    }

    buy(): this{ // method
        alert(this.price)
        return this
    }
}

class SampleSizes extends InvetoryItem{
    colour: string = 'grey'
    size: Build | undefined
}

class Services extends InvetoryItem{
    firstTime: Date
    lastTime: Date

    constructor(name: string, price: number, firstTime: Date, lastTime: Date){
        super(name,price)//to call inherited traits
        this.firstTime = firstTime
        this.lastTime = lastTime
    }

    emailBody() {
        return `Thank you for using ${this.name}. Your service begins at ${this.firstTime}, and ends at ${this.lastTime}`
    }
    emailSubject() {
        return `${this.name} | My company`
    }
}

function sendEmail(emailable: Emailable, to: string){
    console.log('Body:', emailable.emailBody())
    console.log('Subject:', emailable.emailSubject())
    console.log('To:', to)
}

const jerseys = new SampleSizes('some name from somewhere', 12)
jerseys.size = Build.medium
jerseys.colour = 'blue'
jerseys.buy()

const photoOP = new Services('spyware pic', 999, new Date('30 May 2024 10:00:00'),new Date('30 May 2024 17:00:00'))
photoOP.buy()

sendEmail(photoOP, 'example@madeup.com')

// type narrowing /////////////////////////////////////////////////////
const reverse = (value: string | string[] ) => {
    if (typeof value === 'string'){
        return value.split('').reverse().join('')
    } else {
        return [...value].reverse()
    }
}

console.log('reverse string', reverse('123'))
console.log('reverse array', reverse(['1', '2', '3']))

// type narrowing classes
class Person {
    firstName: string
    lastName: string

    constructor(firstName: string, lastName: string){
        this.firstName = firstName
        this.lastName = lastName
    }
}

class Company {
    name: string

    constructor(name: string){
        this.name = name
    }
}

function greetings (entity: Person | Company){
    if (entity instanceof Person){
        console.log(`Hello ${entity.firstName} ${entity.lastName}`)
    } else {
        console.log(`Hello ${entity.name}`)
    }
}

greetings(new Person('Dan', 'Kelly'))
greetings(new Company('vue schools'))

// interface narrowing 
interface Person {
    firstName: string
    lastName: string
}

interface Company {
    name: string
}

function greeting (entity: Person | Company){
    if ("firstName" in entity){
        console.log(`Hello ${entity.firstName} ${entity.lastName}`)
    } else {
        console.log(`Hello ${entity.name}`)
    }
}

greeting({firstName: 'Dan', lastName: 'Kelly'})
greeting({name: 'vue schools'})