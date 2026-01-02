import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const API_BASE_URL = "https://contact-management-web-app-backend.onrender.com";

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/contacts`);

      setContacts(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch contacts. Please try again.');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/contacts/${id}`);

        setContacts(contacts.filter(contact => contact._id !== id));
      } catch (err) {
        setError('Failed to delete contact. Please try again.');
        console.error('Error deleting contact:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading contacts...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contacts</h2>
        <Link to="/add" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>
          Add Contact
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {contacts.length === 0 ? (
        <div className="empty-state">
          <h3>No contacts found</h3>
          <p>Start by adding your first contact.</p>
          <Link to="/add" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            Add Contact
          </Link>
        </div>
      ) : (
        <div className="row">
          {contacts.map((contact) => (
            <div key={contact._id} className="col-md-6 col-lg-4 mb-3">
              <div className="card contact-card h-100">
                <div className="card-body">
                  <h5 className="contact-name">{contact.name}</h5>
                  <p className="contact-email">
                    <i className="fas fa-envelope me-2"></i>
                    {contact.email}
                  </p>
                  <p className="contact-phone">
                    <i className="fas fa-phone me-2"></i>
                    {contact.phone}
                  </p>
                  {contact.company && (
                    <p className="text-muted small mb-2">
                      <i className="fas fa-building me-2"></i>
                      {contact.company}
                    </p>
                  )}
                  <div className="d-flex justify-content-between mt-3">
                    <Link
                      to={`/contact/${contact._id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="fas fa-eye me-1"></i>
                      View
                    </Link>
                    <div>
                      <Link
                        to={`/edit/${contact._id}`}
                        className="btn btn-sm btn-outline-warning me-2"
                      >
                        <i className="fas fa-edit me-1"></i>
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteContact(contact._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="fas fa-trash me-1"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
