// Function that creates a function
function myLogFunction() {
  return (str: string) => {
    console.log(str)
  }
}

const logger = myLogFunction()
logger("your string")

// Function that creates a class
function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = "";
    log(str: string) {
      console.log(str);
      this.completeLog += str + "\n";
    }
    dumpLog() {
      return this.completeLog;
    }
  }
}

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();
logger2.log("Foo");
console.log(logger2.dumpLog())

// Generic
function createSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {}

    set(id: string, value: T) {
      this.db[id] = value;
    }

    get(id: string) {
      return this.db[id];
    }

    getObject(): object {
      return this.db;
    }
  }
}

const StringDatabase = createSimpleMemoryDatabase<string>();

const sdb1 = new StringDatabase();
sdb1.set("A", "Value for A");

// Constructor
// The definition of what the constructor creates is defines by the output of the constructor
type Constructor<T> = new (...args: any[]) => T;

// MIXING new functionality
function Dumpable<T extends Constructor<{
  getObject(): object 
}>>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject())
    }
  }
}

const DumpableStringDatabase = Dumpable(StringDatabase);
const sdb2 = new DumpableStringDatabase();
sdb2.set("Tato", "Hello Tato");
sdb2.dump();
