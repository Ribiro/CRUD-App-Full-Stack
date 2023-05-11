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

    <!-- subtitle and add button  -->
    <div class="columns is-mobile mt-4">
      <div class="column is-half">
        <h2 class="subtitle">Contacts</h2>
      </div>
      <div class="column is-half has-text-right">
        <button class="button is-link">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span class="ml-2">
            Add Contact
          </span>
        </button>
      </div>
    </div>
    
    
    <!-- end of subtitle and add button  -->

    <!-- search bar -->
    <div class="field mt-4">
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Search for contact by last name ...">
        <span class="icon is-small is-left">
          <i class="fas fa-search-plus"></i>
        </span>
      </div>
    </div>
    <!-- end of search bar  -->

    <!-- card -->
    <div
      v-for="contact in contacts"
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
                <button class="button is-info">
                  <span class="icon">
                    <i class="fas fa-pencil"></i>
                  </span>
                </button>
              </span>
              <span class="ml-2">
                <button class="button is-danger">
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
  query, orderBy
} from '@firebase/firestore'
import {db} from './firebase/index.js';

const contactsRef = collection(db, 'contacts')
const contactsCollectionQuery = query(contactsRef)

export default {
  setup() {
    // contacts
    const contacts = ref ([])

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

    return { contacts }
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
</style>