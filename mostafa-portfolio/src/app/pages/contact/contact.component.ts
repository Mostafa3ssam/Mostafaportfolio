import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactMethod {
  icon: string;
  title: string;
  details: { label: string; value: string; href?: string }[];
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  mailtoHref = 'mailto:engmostafa11116@gmail.com';
  
  contactFormData: ContactFormData = {
    name: '',
    email: '',
    message: ''
  };

  contactMethods: ContactMethod[] = [
    {
      icon: 'pi-phone',
      title: 'Phone',
      details: [
        { label: 'Mobile:', value: '+20 112 047 2621', href: 'tel:+201120472621' },
        { label: 'Available:', value: '9 AM - 6 PM (GMT+2)' }
      ]
    },
    {
      icon: 'pi-envelope',
      title: 'Email',
      details: [
        { label: 'Primary:', value: 'engmostafa11116@gmail.com', href: 'mailto:engmostafa11116@gmail.com' },
        { label: 'Response:', value: 'Within 24 hours' }
      ]
    },
    {
      icon: 'pi-map-marker',
      title: 'Location',
      details: [
        { label: 'Based in:', value: 'Cairo, Egypt' },
        { label: 'Timezone:', value: 'Eastern European Time' }
      ]
    }
  ];

  socialLinks = [
    {
      icon: 'pi-linkedin',
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mostafa-essam-bb4821237',
      class: 'linkedin'
    },
    {
      icon: 'pi-github',
      title: 'GitHub',
      href: 'https://github.com/Mostafa3ssam',
      class: 'github'
    },
    {
      icon: 'pi-envelope',
      title: 'Email',
      href: 'mailto:engmostafa11116@gmail.com',
      class: 'email'
    }
  ];

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  ngOnInit(): void {
    // Initialize any required data
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      // Simulate form submission delay
      setTimeout(() => {
        try {
          const subject = `Portfolio Contact - ${this.contactFormData.name}`;
          const body = this.formatEmailBody();
          const mailtoLink = `mailto:engmostafa11116@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          
          // Open mail client
          window.location.href = mailtoLink;
          
          // Show success state
          this.submitSuccess = true;
          this.resetForm();
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
          
        } catch (error) {
          console.error('Error sending message:', error);
          this.submitError = true;
          
          // Hide error message after 5 seconds
          setTimeout(() => {
            this.submitError = false;
          }, 5000);
        } finally {
          this.isSubmitting = false;
        }
      }, 1000);
    }
  }

  private validateForm(): boolean {
    return !!(
      this.contactFormData.name?.trim() &&
      this.contactFormData.email?.trim() &&
      this.contactFormData.message?.trim() &&
      this.isValidEmail(this.contactFormData.email)
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private formatEmailBody(): string {
    return `Name: ${this.contactFormData.name}
Email: ${this.contactFormData.email}

Message:
${this.contactFormData.message}

---
This message was sent from your portfolio website.`;
  }

  private resetForm(): void {
    this.contactFormData = { name: '', email: '', message: '' };
  }

  // Helper method to track form field changes
  onFieldChange(field: keyof ContactFormData): void {
    // Clear error states when user starts typing
    if (this.submitError) {
      this.submitError = false;
    }
  }

  // Method to get field validation state for potential future use
  getFieldValidationState(field: string, form: NgForm): string {
    const control = form.controls[field];
    if (!control) return '';
    
    if (control.invalid && (control.dirty || control.touched)) {
      return 'invalid';
    }
    if (control.valid && (control.dirty || control.touched)) {
      return 'valid';
    }
    return '';
  }
}