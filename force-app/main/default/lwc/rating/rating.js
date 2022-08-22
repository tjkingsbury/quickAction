import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ID_FIELD from '@salesforce/schema/Account.Id';
import RATING_FIELD from '@salesforce/schema/Account.Rating';

const FIELDS = [RATING_FIELD];

export default class QuickEditExample extends LightningElement {
    disabled = false;
    @api recordId;
    @api objectApiName;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;

    get rating() {
        return getFieldValue(this.account.data, RATING_FIELD);
    }

    handleCancel(event) {
       // Add your cancel button implementation here
       this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleSubmit(e) {
        // Add your updateRecord implementation
        const fields = {};
        fields[RATING_FIELD.fieldApiName] = this.template.querySelector("[data-field='Rating']").value;
        fields[ID_FIELD.fieldApiName] = this.recordId;        
        const recordInput = {fields};
        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account updated',
                        variant: 'success'
                    })
                );
                // Display fresh data in the form
                return refreshApex(this.account);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
        // Close the modal window and display a success toast
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}