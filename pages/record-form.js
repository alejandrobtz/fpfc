 // Global credits array
 let creditos = [];
  
 class RecordForm extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('record-form-component');
        if (template) {
            
            console.log(template.content, "template.content");
            const templateContent = template.content.cloneNode(true);
            
            // Use template content with direct DOM insertion for better Tailwind compatibility
            this.appendChild(templateContent);
            
            // Store reference to the component itself for querying
             this.componentRoot = this;
             console.log("Component created:", this);
             
             // Check if buttons are present
             setTimeout(() => {
                 const buttons = this.querySelectorAll('button');
                 console.log("Buttons found after creation:", buttons.length);
                 buttons.forEach((btn, index) => {
                     console.log(`Button ${index}:`, btn.id, btn.textContent?.trim());
                 });
             }, 100);
            
            // Setup event listeners
            this.setupEventListeners();
        }
    }

   connectedCallback() {
     // Set initial styles when component is connected to DOM
     this.style.display = 'none';
   }

   // Method to setup event listeners after content is loaded
    setupEventListeners() {
        if (!this.componentRoot) return;
     
        console.log('Setting up event listeners...');
        
        // Add event listeners
        const cancelBtn = this.componentRoot.querySelector('#cancel-btn');
        const agregarCreditoBtn = this.componentRoot.querySelector('#agregar-credito-btn');
        const saveDraftBtn = this.componentRoot.querySelector('#save-draft-btn');
        const saveBtn = this.componentRoot.querySelector('#save-btn');
        
        console.log('Buttons found:', {
            cancelBtn: !!cancelBtn,
            agregarCreditoBtn: !!agregarCreditoBtn,
            saveDraftBtn: !!saveDraftBtn,
            saveBtn: !!saveBtn
        });
        
        // Debug: Log all buttons in the component
        const allButtons = this.componentRoot.querySelectorAll('button');
        console.log('All buttons found:', allButtons.length);
        allButtons.forEach((btn, index) => {
            console.log(`Button ${index}:`, btn.id, btn.textContent?.trim());
        });
        
        if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            console.log('Cancel button clicked');
            this.close();
        });
        }
        
        if (agregarCreditoBtn) {
        agregarCreditoBtn.addEventListener('click', () => {
            console.log('Add credit button clicked');
            this.agregarCredito();
        });
        }
        
        if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            console.log('Save draft button clicked');
            this.guardarBorrador();
        });
        }
        
        if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            console.log('Save button clicked');
            this.guardarYCerrar();
        });
        }
        
        // Initialize form reference
        this.form = this.componentRoot.querySelector('#record-form');
        
        // Add form submit handler
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(e);
            });
        }
        
        // Initialize credits table
        this.actualizarTablaCreditos();
        
        console.log('Event listeners setup complete');
   }

   // Method to open the form
    open() {
        console.log('Opening form...');
        this.style.display = 'block';
        const modalOverlay = this.componentRoot.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.classList.add('show');
            console.log('Modal overlay shown');
        } else {
            console.error('Modal overlay not found');
        }
    }

   // Method to close the form
    close() {
        console.log('Closing form...');
        this.style.display = 'none';
        const modalOverlay = this.componentRoot.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('show');
            console.log('Modal overlay hidden');
        }
    }


   // Method to handle form submission
   handleFormSubmit(e) {
     const formData = new FormData(e.target);
     const data = Object.fromEntries(formData);
     
     // Add credits to the data
     data.creditos = creditos;
     
     // Dispatch custom event with form data
     this.dispatchEvent(new CustomEvent('form-submitted', {
       detail: data
     }));
     
     this.close();
   }


    agregarCredito() {
        console.log('Adding credit...');
        const nombre = this.componentRoot.querySelector('#nombrePersona')?.value;
        const rol = this.componentRoot.querySelector('#rolPersona')?.value;
        
        console.log('Credit data:', { nombre, rol });
        
        if (nombre && rol) {
        const credito = {
            id: Date.now(),
            nombre: nombre,
            rol: rol
        };
        
        creditos.push(credito);
        this.actualizarTablaCreditos();
        
        // Clear inputs
        this.componentRoot.querySelector('#nombrePersona').value = '';
        this.componentRoot.querySelector('#rolPersona').value = '';
        
        console.log('Credit added successfully');
        } else {
        alert('Por favor complete todos los campos');
        }
    }

    // Function to update credits table - fix scope issues
    actualizarTablaCreditos() {
        const tbody = this.componentRoot.querySelector('#creditosTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        creditos.forEach(credito => {
        const row = document.createElement('tr');
        row.className = 'border-t border-[#e3dfd4]';
        row.innerHTML = `
            <td class="px-4 py-2 text-sm text-[#191610]">${credito.nombre}</td>
            <td class="px-4 py-2 text-sm text-[#191610]">${credito.rol}</td>
            <td class="px-4 py-2 text-sm text-[#191610]">
            <button class="eliminar-credito-btn px-2 py-1 bg-red-500 text-white rounded text-xs" data-id="${credito.id}">Eliminar</button>
            </td>
        `;
        
        // Add event listener to delete button
        const deleteBtn = row.querySelector('.eliminar-credito-btn');
        deleteBtn.addEventListener('click', () => this.eliminarCredito(credito.id));
        
        tbody.appendChild(row);
        });
    }

  // Function to remove credit - fix scope issues
    eliminarCredito(id) {
        creditos = creditos.filter(c => c.id !== id);
        this.actualizarTablaCreditos();
    }

  // Function to save draft - fix scope issues
    guardarBorrador() {
        console.log('Saving draft...');
        const formData = this.obtenerDatosFormulario();
        formData.estado = 'borrador';
        this.guardarRegistro(formData);
        alert('Borrador guardado exitosamente');
    }

  // Function to save and close - fix scope issues
    guardarYCerrar() {
        console.log('Saving and closing...');
        const formData = this.obtenerDatosFormulario();
        formData.estado = 'completado';
        this.guardarRegistro(formData);
        alert('Registro guardado exitosamente');
        this.close();
    }

  // Function to get form data - fix scope issues
    obtenerDatosFormulario() {
        return {
        id: this.currentRecordId || Date.now(),
        codigo: this.componentRoot.querySelector('#codigo')?.value || '',
        titulo: this.componentRoot.querySelector('#titulo')?.value || '',
        anio: this.componentRoot.querySelector('#anio')?.value || '',
        pais: this.componentRoot.querySelector('#pais')?.value || '',
        empresa: this.componentRoot.querySelector('#empresa')?.value || '',
        director: this.componentRoot.querySelector('#director')?.value || '',
        duracion: this.componentRoot.querySelector('#duracion')?.value || '',
        actual: this.componentRoot.querySelector('#actual')?.value || '',
        antiguo: this.componentRoot.querySelector('#antiguo')?.value || '',
        productorEjecutivo: this.componentRoot.querySelector('#productorEjecutivo')?.value || '',
        productorAsociado: this.componentRoot.querySelector('#productorAsociado')?.value || '',
        guionista: this.componentRoot.querySelector('#guionista')?.value || '',
        fotografo: this.componentRoot.querySelector('#fotografo')?.value || '',
        editor: this.componentRoot.querySelector('#editor')?.value || '',
        imagen: this.componentRoot.querySelector('#imagen')?.value || '',
        sonido: this.componentRoot.querySelector('#sonido')?.value || '',
        negativo: this.componentRoot.querySelector('#negativo')?.checked || false,
        positivo: this.componentRoot.querySelector('#positivo')?.checked || false,
        reversible: this.componentRoot.querySelector('#reversible')?.checked || false,
        blanco: this.componentRoot.querySelector('#blanco')?.checked || false,
        negro: this.componentRoot.querySelector('#negro')?.checked || false,
        color: this.componentRoot.querySelector('#color')?.checked || false,
        filmico: this.componentRoot.querySelector('#filmico')?.checked || false,
        magnetico: this.componentRoot.querySelector('#magnetico')?.checked || false,
        optico: this.componentRoot.querySelector('#optico')?.checked || false,
        digital: this.componentRoot.querySelector('#digital')?.checked || false,
        restaurado: this.componentRoot.querySelector('#restaurado')?.checked || false,
        fechaRestauracion: this.componentRoot.querySelector('#fechaRestauracion')?.value || '',
        resolucionCodec: this.componentRoot.querySelector('#resolucionCodec')?.value || '',
        peso: this.componentRoot.querySelector('#peso')?.value || '',
        aspectRatio: this.componentRoot.querySelector('#aspectRatio')?.value || '',
        fps: this.componentRoot.querySelector('#fps')?.value || '',
        nuevoPh: this.componentRoot.querySelector('#nuevoPh')?.value || '',
        tipoUbicacion: this.componentRoot.querySelector('#tipoUbicacion')?.value || '',
        codigoUbicacion: this.componentRoot.querySelector('#codigoUbicacion')?.value || '',
        sinopsis: this.componentRoot.querySelector('#sinopsis')?.value || '',
        creditos: creditos,
        guion: this.componentRoot.querySelector('#guion')?.value || '',
        fotografias: this.componentRoot.querySelector('#fotografias')?.checked || false,
        cartel: this.componentRoot.querySelector('#cartel')?.checked || false,
        sonidoMusica: this.componentRoot.querySelector('#sonidoMusica')?.checked || false,
        observaciones: this.componentRoot.querySelector('#observaciones')?.value || '',
        linkKoha: this.componentRoot.querySelector('#linkKoha')?.value || '',
        fechaCreacion: new Date().toISOString()
        };
    }

    // Function to save record - fix scope issues
    guardarRegistro(data) {
        // Save to localStorage for demo purposes
        // In a real application, this would be an API call
        const registros = JSON.parse(localStorage.getItem('registros') || '[]');

        if (this.currentRecordId) {
            // Update existing record
            const index = registros.findIndex(r => r.id === this.currentRecordId);
            if (index !== -1) {
            registros[index] = data;
            }
        } else {
            // Add new record
            registros.push(data);
        }

        localStorage.setItem('registros', JSON.stringify(registros));
        
        // Dispatch event to notify parent components
        this.dispatchEvent(new CustomEvent('record-saved', {
            detail: data
        }));
        
        console.log('Record saved:', data);
    }
}

customElements.define('record-form', RecordForm);