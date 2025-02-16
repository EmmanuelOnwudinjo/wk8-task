// Telephone class implementing the Observer Pattern
class Telephone {
    constructor() {
        this.phoneNumbers = new Set(); // Stores unique phone numbers
        this.observers = new Set(); // Stores registered observers
    }

    // Add a phone number to the list
    addPhoneNumber(number) {
        if (!this.phoneNumbers.has(number)) {
            this.phoneNumbers.add(number);
            updatePhoneList();
            logCall(`✅ Number Added: ${number}`);
        } else {
            logCall(`⚠️ Number Already Exists: ${number}`);
        }
    }

    // Remove a phone number from the list
    removePhoneNumber(number) {
        if (this.phoneNumbers.has(number)) {
            this.phoneNumbers.delete(number);
            updatePhoneList();
            logCall(`🗑️ Number Removed: ${number}`);
        } else {
            logCall(`❌ Number Not Found: ${number}`);
        }
    }

    // Add an observer to get notified when a number is dialed
    addObserver(observer) {
        this.observers.add(observer);
    }

    // Remove an observer
    removeObserver(observer) {
        this.observers.delete(observer);
    }

    // Dial a phone number and notify observers
    dialPhoneNumber(number) {
        if (this.phoneNumbers.has(number)) {
            logCall(`📞 Dialing ${number}...`);
            this.notifyObservers(number);
        } else {
            logCall(`⚠️ Cannot Dial ${number}. Number Not Found.`);
        }
    }

    // Notify all observers when a number is dialed
    notifyObservers(number) {
        this.observers.forEach(observer => observer.notify(number));
    }
}

// Observer class
class Observer {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }

    notify(number) {
        logCall(`${this.name}: ${this.action(number)}`);
    }
}

// Create the telephone object
const phone = new Telephone();

// Create observers with different behaviors
const observer1 = new Observer("👀 Observer 1", (num) => `Logging call to ${num}`);
const observer2 = new Observer("🔊 Observer 2", (num) => `Alert! Calling ${num}...`);

// Register observers to the telephone
phone.addObserver(observer1);
phone.addObserver(observer2);

// UI Functions
function addNumber() {
    const number = document.getElementById("phoneNumber").value.trim();
    if (number) {
        phone.addPhoneNumber(number);
        document.getElementById("phoneNumber").value = "";
    } else {
        logCall("⚠️ Please enter a valid number.");
    }
}

function removeNumber() {
    const number = document.getElementById("phoneNumber").value.trim();
    if (number) {
        phone.removePhoneNumber(number);
        document.getElementById("phoneNumber").value = "";
    } else {
        logCall("⚠️ Enter a number to remove.");
    }
}

function dialNumber() {
    const number = document.getElementById("phoneNumber").value.trim();
    if (number) {
        phone.dialPhoneNumber(number);
        document.getElementById("phoneNumber").value = "";
    } else {
        logCall("⚠️ Enter a number to dial.");
    }
}

function updatePhoneList() {
    const list = document.getElementById("phoneList");
    list.innerHTML = "";
    phone.phoneNumbers.forEach(num => {
        const li = document.createElement("li");
        li.textContent = num;
        list.appendChild(li);
    });
}

function logCall(message) {
    const log = document.getElementById("callLog");
    const p = document.createElement("p");
    p.innerHTML = message;
    log.appendChild(p);
}

// Attach event listeners
document.getElementById("addBtn").addEventListener("click", addNumber);
document.getElementById("removeBtn").addEventListener("click", removeNumber);
document.getElementById("dialBtn").addEventListener("click", dialNumber);
