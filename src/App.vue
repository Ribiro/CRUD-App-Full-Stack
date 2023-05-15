<template>
  <div class="container mt-4">
    <!-- title  -->
    <h1 class="title center-heading">
      <span class="icon">
        <i class="fas fa-address-book"></i>
      </span>
      <span class="ml-4">
        Phone Book App
      </span>
    </h1>
    <!-- end of title  -->
    <div v-if="SuccessAddingContact" class="notification is-success fa-sm">
      <button @click="this.SuccessAddingContact=false" class="delete"></button>
      Contact Added Successfully
    </div>

    <div v-if="SuccessDeletingContact" class="notification is-danger fa-sm">
      <button @click="this.SuccessDeletingContact=false" class="delete"></button>
      Contact Deleted Successfully
    </div>

    <div v-if="SuccessEditingContact" class="notification is-success fa-sm">
      <button @click="this.SuccessEditingContact=false" class="delete"></button>
      Contact Updated Successfully
    </div>

    <!-- subtitle and add button  -->
    <div class="columns is-mobile mt-4">
      <div class="column is-half">
        <h2 class="subtitle">Contacts</h2>
      </div>
      <div class="column is-half has-text-right">
        <button class="button is-link" @click="showAddModal">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span class="ml-2">
            Add Contact
          </span>
        </button>
      </div>
    </div>
    
    <div class="modal" style="padding: 4px;" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Add Contact</p>
            <button @click="showModal = false" class="delete" aria-label="close"></button>
          </header>
          <form @submit.prevent="addContact">
            <section class="modal-card-body">
              <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                  <input v-model="first_name" required class="input" type="text" placeholder="Enter Contact's First Name">
                </div>
              </div>
              <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                  <input v-model="last_name" required class="input" type="text" placeholder="Enter Contact's Last Name">
                </div>
              </div>
              <div class="field">
                <label class="label">Phone Number</label>
                <div class="control">
                  <input v-model="phone_number" required class="input" type="text" placeholder="Enter Contact's Phone Number">
                </div>
              </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-link">Add Contact</button>
            <!-- <button @click="showModal = false" class="button">Cancel</button> -->
          </footer>
          </form>
        </div>
    </div>
    
    <!-- end of subtitle and add button  -->

    <!-- search bar -->
    <div class="field mt-4">
      <div class="control has-icons-left has-icons-right">
        <input v-model="searchTerm" class="input" type="text" placeholder="Search for contact by last name ...">
        <span class="icon is-small is-left">
          <i class="fas fa-search-plus"></i>
        </span>
      </div>
    </div>
    <!-- end of search bar  -->

    <!-- card -->
    <div v-if="isFilteredDataEmpty" style="display: flex; align-items: center; justify-content: center;">
      <h3>No Contacts Available!</h3>
    </div>

    <div
      v-for="contact in filteredData"
      :key="contact.id"
    >
      <div class="card mt-4">
        <div class="card-content">
          <div class="columns is-mobile">
            <div class="column is-two-thirds">
              <div>
                <h1 class="subtitle">
                  <span>{{contact.first_name}}&nbsp;</span>
                  <span>{{contact.last_name}}</span>
                </h1>
              </div>
              <div class="mt-2">
                <h1>
                  <span class="icon is-small is-left">
                    <i class="fas fa-phone-square-alt"></i>
                  </span>
                  {{contact.phone_number}}
                </h1>
              </div>
            </div>
            <div class="column is-one-third has-text-right">
              <span class="mb-2">
                <button @click="contact.showEditModal = true" class="button is-info">
                  <span class="icon">
                    <i class="fas fa-pencil"></i>
                  </span>
                </button>
              </span>

              <!-- update modal  -->
              <div class="modal" style="padding: 4px;" :class="{ 'is-active': contact.showEditModal }">
                <div class="modal-background"></div>
                <div class="modal-card">
                  <header class="modal-card-head">
                    <p class="modal-card-title is-left">Update {{contact.first_name}} {{ contact.last_name }}</p>
                    <button @click="contact.showEditModal = false" class="delete" aria-label="close"></button>
                  </header>
                  <form @submit.prevent="updateContact(contact.id)">
                    <section class="modal-card-body">
                      <div class="field">
                        <label class="label">First Name</label>
                        <div class="control">
                          <input v-model="contact.first_name" required class="input" type="text" placeholder="Enter Contact's First Name">
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Last Name</label>
                        <div class="control">
                          <input v-model="contact.last_name" required class="input" type="text" placeholder="Enter Contact's Last Name">
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Phone Number</label>
                        <div class="control">
                          <input v-model="contact.phone_number" required class="input" type="text" placeholder="Enter Contact's Phone Number">
                        </div>
                      </div>
                    </section>
                    <footer class="modal-card-foot">
                      <button class="button is-link">Update Contact</button>
                    </footer>
                  </form>
                </div>
              </div>

              <!-- end of update modal  -->
              <span class="ml-2">
                <button @click="deleteContact(contact.id)" class="button is-danger">
                  <span class="icon">
                    <i class="fas fa-trash-alt"></i>
                  </span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end of card -->
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import { 
  collection, onSnapshot, 
  addDoc, doc, deleteDoc, updateDoc,
  query
} from '@firebase/firestore'
import {db} from './firebase/index.js';

const contactsRef = collection(db, 'contacts')
const contactsCollectionQuery = query(contactsRef)

export default {
  setup() {
    // contacts
    const contacts = ref ([])
    const showModal = ref(false)
    const showEditModal = ref(false)
    const SuccessAddingContact = ref(false)
    const SuccessEditingContact = ref(false)
    const SuccessDeletingContact = ref(false)
    const searchTerm = ref('')

    const first_name = ref('')
    const last_name = ref('')
    const phone_number = ref('')
    
    onMounted(()=>{
      onSnapshot(contactsCollectionQuery, (querySnapshot) => {
        const fetchedContacts = []
        querySnapshot.forEach((doc) => {
          const contact = {
          id: doc.id,
          first_name: doc.data().first_name,
          last_name: doc.data().last_name,
          phone_number: doc.data().phone_number
        }
        fetchedContacts.push(contact)
        })
        contacts.value = fetchedContacts
        console.log(contacts)
      })
    })

    return { contacts, showModal, first_name, 
      last_name, phone_number, SuccessAddingContact, 
      SuccessDeletingContact, showEditModal, SuccessEditingContact, searchTerm 
    }
  },
  computed: {
    filteredData(){
      return this.contacts.filter((item) => {
        return item.last_name.toLowerCase().includes(this.searchTerm.toLocaleLowerCase());
      })
    },
    isFilteredDataEmpty() {
      return this.filteredData.length === 0;
    },
  },
  methods: {
    addContact(){
      addDoc(contactsRef, {
        first_name: this.first_name,
        last_name: this.last_name,
        phone_number: this.phone_number
      })
      this.first_name = '';
      this.last_name = '';
      this.phone_number = '';
      this.showModal = false;
      this.SuccessAddingContact = true;
    },

    updateContact(id){
      const contact = this.contacts.find((c) => c.id === id);
      if (!contact) {
        return;
      }
      const docRef = doc(db, "contacts", id);
      updateDoc(docRef, contact)
      contact.showEditModal = false;
      this.SuccessEditingContact = true;
      // .then(() => {
      //   contact.showEditModal = false;
      //   this.SuccessEditingContact = true;
      //   console.log("Value of an Existing Document Field has been updated");
      // })
      // .catch(error => {
      //     console.log(error);
      // })
      },

    deleteContact(id){
      deleteDoc(doc(contactsRef, id));
      this.SuccessDeletingContact = true;
    },

    showAddModal(){
      this.showModal = true;
      this.SuccessAddingContact = false;
      this.SuccessDeletingContact = false;
      this.SuccessEditingContact = false;
    }
  },
}


</script>

<style>
@import 'bulma/css/bulma.min.css';
@import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

.container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 20px;
}
.center-heading {
  text-align: center;
}

.modal-card-title {
  text-align: left !important;
}

.modal-card-body {
  text-align: left !important;
}
</style>