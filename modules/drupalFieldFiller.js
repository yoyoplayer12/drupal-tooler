// Drupal Field Filler Module
// Integrates fake-filler functionality to automatically fill Drupal form fields

class DrupalDataGenerator {
    constructor() {
        this.firstNames = [
            "John", "Jane", "Michael", "Sarah", "David", "Emily", "Robert", "Jessica",
            "William", "Ashley", "James", "Amanda", "Christopher", "Stephanie", "Daniel",
            "Melissa", "Matthew", "Nicole", "Anthony", "Elizabeth", "Mark", "Helen",
            "Donald", "Deborah", "Steven", "Dorothy", "Paul", "Lisa", "Andrew", "Nancy"
        ];
        
        this.lastNames = [
            "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
            "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
            "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
            "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"
        ];
        
        this.domains = [".com", ".net", ".org", ".info", ".co.uk", ".ca"];
        
        this.wordBank = [
            "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
            "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
            "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
            "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo"
        ];
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    firstName() {
        return this.firstNames[this.randomNumber(0, this.firstNames.length - 1)];
    }

    lastName() {
        return this.lastNames[this.randomNumber(0, this.lastNames.length - 1)];
    }

    email() {
        const firstName = this.firstName().toLowerCase();
        const lastName = this.lastName().toLowerCase();
        const domain = this.domains[this.randomNumber(0, this.domains.length - 1)];
        const randomNum = this.randomNumber(1, 999);
        return `${firstName}.${lastName}${randomNum}@example${domain}`;
    }

    phoneNumber() {
        const areaCode = this.randomNumber(200, 999);
        const exchange = this.randomNumber(200, 999);
        const number = this.randomNumber(1000, 9999);
        return `(${areaCode}) ${exchange}-${number}`;
    }

    words(count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(this.wordBank[this.randomNumber(0, this.wordBank.length - 1)]);
        }
        return result.join(' ');
    }

    paragraph(minWords = 10, maxWords = 30) {
        const wordCount = this.randomNumber(minWords, maxWords);
        const text = this.words(wordCount);
        return text.charAt(0).toUpperCase() + text.slice(1) + '.';
    }

    date() {
        const year = this.randomNumber(1990, new Date().getFullYear());
        const month = String(this.randomNumber(1, 12)).padStart(2, '0');
        const day = String(this.randomNumber(1, 28)).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    url() {
        const subdomain = this.words(1).toLowerCase();
        const domain = this.domains[this.randomNumber(0, this.domains.length - 1)];
        return `https://www.${subdomain}${domain}`;
    }

    organizationName() {
        const part1 = this.lastName();
        const part2 = this.lastName();
        const suffixes = ["Inc", "LLC", "Corp", "Ltd", "Co"];
        const suffix = suffixes[this.randomNumber(0, suffixes.length - 1)];
        return `${part1} & ${part2} ${suffix}`;
    }
}

class DrupalFieldFiller {
    constructor() {
        this.generator = new DrupalDataGenerator();
        this.clickedElement = null;
    }

    setClickedElement(element) {
        this.clickedElement = element;
    }

    fireEvents(element) {
        ['input', 'change', 'blur', 'keyup'].forEach(eventType => {
            const event = new Event(eventType, { bubbles: true, cancelable: true });
            element.dispatchEvent(event);
        });
    }

    isFieldType(element, types) {
        const name = element.name?.toLowerCase() || '';
        const id = element.id?.toLowerCase() || '';
        const placeholder = element.placeholder?.toLowerCase() || '';
        const label = this.getFieldLabel(element)?.toLowerCase() || '';
        
        const searchText = `${name} ${id} ${placeholder} ${label}`;
        
        return types.some(type => searchText.includes(type));
    }

    getFieldLabel(element) {
        // Try to find associated label
        if (element.id) {
            const label = document.querySelector(`label[for="${element.id}"]`);
            if (label) return label.textContent;
        }
        
        // Look for nearby label
        const parent = element.closest('.form-item, .field-wrapper, .form-group');
        if (parent) {
            const label = parent.querySelector('label');
            if (label) return label.textContent;
        }
        
        return '';
    }

    fillInputElement(element) {
        if (element.disabled || element.readOnly) return;

        const inputType = element.type?.toLowerCase() || 'text';
        
        switch (inputType) {
            case 'email':
                element.value = this.generator.email();
                break;
                
            case 'tel':
            case 'phone':
                element.value = this.generator.phoneNumber();
                break;
                
            case 'url':
                element.value = this.generator.url();
                break;
                
            case 'date':
                element.value = this.generator.date();
                break;
                
            case 'number':
                element.value = this.generator.randomNumber(1, 100);
                break;
                
            case 'checkbox':
                element.checked = Math.random() > 0.5;
                break;
                
            case 'radio':
                // Handle radio buttons by selecting one randomly from the group
                if (element.name) {
                    const radioGroup = document.querySelectorAll(`input[name="${element.name}"][type="radio"]`);
                    if (radioGroup.length > 0) {
                        const randomIndex = this.generator.randomNumber(0, radioGroup.length - 1);
                        radioGroup[randomIndex].checked = true;
                    }
                }
                break;
                
            case 'password':
                element.value = 'TestPassword123!';
                break;
                
            default:
                // Text fields - determine content based on field purpose
                // Check more specific patterns first to avoid false matches
                if (this.isFieldType(element, ['title', 'subject'])) {
                    element.value = this.generator.words(this.generator.randomNumber(3, 8));
                } else if (this.isFieldType(element, ['first', 'fname', 'given'])) {
                    element.value = this.generator.firstName();
                } else if (this.isFieldType(element, ['last', 'lname', 'family', 'surname'])) {
                    element.value = this.generator.lastName();
                } else if (this.isFieldType(element, ['name']) && !this.isFieldType(element, ['user', 'login'])) {
                    element.value = `${this.generator.firstName()} ${this.generator.lastName()}`;
                } else if (this.isFieldType(element, ['email', 'mail'])) {
                    element.value = this.generator.email();
                } else if (this.isFieldType(element, ['phone', 'tel', 'mobile'])) {
                    element.value = this.generator.phoneNumber();
                } else if (this.isFieldType(element, ['organization', 'company', 'org'])) {
                    element.value = this.generator.organizationName();
                } else if (this.isFieldType(element, ['user', 'login', 'username'])) {
                    element.value = `${this.generator.firstName().toLowerCase()}${this.generator.randomNumber(1, 999)}`;
                } else {
                    // Default text content
                    element.value = this.generator.words(this.generator.randomNumber(2, 5));
                }
                break;
        }
        
        this.fireEvents(element);
    }

    fillTextAreaElement(element) {
        if (element.disabled || element.readOnly) return;
        
        // Generate appropriate content based on field purpose
        if (this.isFieldType(element, ['description', 'summary', 'body', 'content', 'message', 'comment'])) {
            element.value = this.generator.paragraph(15, 50);
        } else {
            element.value = this.generator.paragraph(5, 15);
        }
        
        this.fireEvents(element);
    }

    fillSelectElement(element) {
        if (element.disabled || element.readOnly) return;
        
        const options = Array.from(element.options).filter(option => option.value && option.value !== '');
        if (options.length > 0) {
            const randomIndex = this.generator.randomNumber(0, options.length - 1);
            element.selectedIndex = options[randomIndex].index;
            this.fireEvents(element);
        }
    }

    fillContentEditableElement(element) {
        if (element.getAttribute('contenteditable') !== 'true') return;
        
        element.innerHTML = this.generator.paragraph(10, 30);
        this.fireEvents(element);
    }
}

// Global instance
let drupalFieldFiller = null;

export function initializeDrupalFieldFiller() {
    if (!drupalFieldFiller) {
        drupalFieldFiller = new DrupalFieldFiller();
    }
    return drupalFieldFiller;
}

export function initializeFieldFillerContextMenu() {
    console.log('Drupal Tooler: Initializing field filler context menu support');

    const filler = initializeDrupalFieldFiller();

    // Add context menu support - track clicked element for "Fill this field"
    document.addEventListener('contextmenu', (event) => {
        filler.setClickedElement(event.target);
    });
}

export function fillAllFormFields() {
    const filler = initializeDrupalFieldFiller();

    // Fill all visible form elements
    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"])');
    inputs.forEach(input => filler.fillInputElement(input));

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => filler.fillTextAreaElement(textarea));

    const selects = document.querySelectorAll('select');
    selects.forEach(select => filler.fillSelectElement(select));

    const editables = document.querySelectorAll('[contenteditable="true"]');
    editables.forEach(editable => filler.fillContentEditableElement(editable));

    console.log('Drupal Tooler: Filled all form fields with fake data');
}

export function fillSingleField() {
    const filler = initializeDrupalFieldFiller();
    const element = filler.clickedElement || document.activeElement;

    if (element) {
        const tagName = element.tagName.toLowerCase();

        if (tagName === 'input') {
            filler.fillInputElement(element);
        } else if (tagName === 'textarea') {
            filler.fillTextAreaElement(element);
        } else if (tagName === 'select') {
            filler.fillSelectElement(element);
        } else if (element.isContentEditable) {
            filler.fillContentEditableElement(element);
        }

        filler.setClickedElement(null);
        console.log('Drupal Tooler: Filled single field with fake data');
    }
}

// Make functions globally available for context menu
if (typeof window !== 'undefined') {
    window.fillAllFormFields = fillAllFormFields;
    window.fillSingleField = fillSingleField;
    window.drupalFieldFillerLoaded = true;
}
