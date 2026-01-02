import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactDetail = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContact();
  }, [id]);

  const API_BASE_URL = "https://contact-management-web-app-backend.onrender.com";

  const fetchContact = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/contacts/${id}`);


      setContact(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch contact. Please try again.');
      console.error('Error fetching contact:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await  axios.delete(`${API_BASE_URL}/api/contacts/${id}`);

        navigate('/');
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
        <p className="mt-2">Loading contact...</p>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center">
        <h3>Contact not found</h3>
        <Link to="/" className="btn btn-primary">
          <i className="fas fa-arrow-left me-2"></i>
          Back to Contacts
        </Link>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="detail-section">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Contact Details</h2>
          <div>
            <Link to={`/edit/${contact._id}`} className="btn btn-warning me-2">
              <i className="fas fa-edit me-2"></i>
              Edit
            </Link>
            <button onClick={deleteContact} className="btn btn-danger">
              <i className="fas fa-trash me-2"></i>
              Delete
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <div className="detail-label">Name</div>
              <div className="detail-value">{contact.name}</div>
            </div>

            <div className="mb-3">
              <div className="detail-label">Email</div>
              <div className="detail-value">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            </div>

            <div className="mb-3">
              <div className="detail-label">Phone</div>
              <div className="detail-value">
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </div>
            </div>

            {contact.company && (
              <div className="mb-3">
                <div className="detail-label">Company</div>
                <div className="detail-value">{contact.company}</div>
              </div>
            )}
          </div>

          <div className="col-md-6">
            {contact.address && (
              <div className="mb-3">
                <div className="detail-label">Address</div>
                <div className="detail-value">{contact.address}</div>
              </div>
            )}

            {contact.notes && (
              <div className="mb-3">
                <div className="detail-label">Notes</div>
                <div className="detail-value">{contact.notes}</div>
              </div>
            )}

            <div className="mb-3">
              <div className="detail-label">Created</div>
              <div className="detail-value">
                {new Date(contact.createdAt).toLocaleDateString()} at{' '}
                {new Date(contact.createdAt).toLocaleTimeString()}
              </div>
            </div>

            <div className="mb-3">
              <div className="detail-label">Last Updated</div>
              <div className="detail-value">
                {new Date(contact.updatedAt).toLocaleDateString()} at{' '}
                {new Date(contact.updatedAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
