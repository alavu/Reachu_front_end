import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartnerService } from '../services/partner.service';
import { ValidationPatterns } from 'src/app/validator/regular_expressions';

@Component({
  selector: 'app-edit-partner-modal',
  templateUrl: './edit-partner-modal.component.html',
  styleUrls: ['./edit-partner-modal.component.scss']
})
export class EditPartnerModalComponent implements OnInit {
  editForm: FormGroup;
  imageUrl: string;
  imageFile: File | null = null; 
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPartnerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private partnerService: PartnerService
  ) { }

  ngOnInit(): void {
    // Initialize the form group and controls with validation
    this.editForm = this.fb.group({
      name: [this.data.partner.name || '', [Validators.required, Validators.pattern(ValidationPatterns.name)]],
      phone: [this.data.partner.phone || '', [Validators.required, Validators.pattern(ValidationPatterns.phone)]],
      email: [{ value: this.data.partner.email || '', disabled: true }, [Validators.required, Validators.email]],
      service: [this.data.partner.service || '', [Validators.required, Validators.pattern(ValidationPatterns.service)]],
    });

    this.imageUrl = this.data.partner.imageUrl || '/assets/profile.jpg'; // Set default image
  }

  // Close modal
  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.editForm.valid) {
      const formData = new FormData();
      const updatedPartner = { ...this.data.partner, ...this.editForm.getRawValue() }; // Use getRawValue to include disabled fields
  
      // Append form data
      formData.append('name', updatedPartner.name);
      formData.append('phone', updatedPartner.phone);
      formData.append('email', updatedPartner.email);
      formData.append('service', updatedPartner.service);
  
      // Check if a file is selected and append it to FormData
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }
  
      // Use formData with the updatePartner method
      this.partnerService.updatePartner(updatedPartner.id, formData).subscribe(
        (response) => {
          console.log('Partner updated successfully:', response);
          this.dialogRef.close(response); // Close the modal and pass the updated data
        },
        (error) => {
          console.error('Failed to update partner:', error);
        }
      );
    } else {
      console.log('Form is invalid:', this.editForm.errors);
      this.editForm.markAllAsTouched(); // Highlight invalid fields
    }
  }
  

  // Trigger file input click
  onImageClick(): void {
    this.fileInput.nativeElement.click();
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.imageFile = file; // Store the selected file
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string; // Preview the selected image
      };
      reader.readAsDataURL(file);
    }
  }
}
