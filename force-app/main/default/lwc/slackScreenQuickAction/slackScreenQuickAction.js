import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ID_FIELD from '@salesforce/schema/Account.Id';
import OWNERID_FIELD from '@salesforce/schema/Account.OwnerId';
import RATING_FIELD from '@salesforce/schema/Account.Rating';

const FIELDS = [RATING_FIELD,OWNERID_FIELD];

export default class SlackScreenQuickAction extends LightningElement {
    disabled = false;
    @api recordId;
    @api objectApiName;
    message;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;

    handleCancel(event) {
       this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleSubmit(e) {
        console.log(' sending message: ' + this.message);
        // Add your slack messaging call here

        // Close the modal window and display a success toast
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Message Sent',
                variant: 'success'
            })
        );        
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleMessageChange(event) {
        this.message = event.detail.value;
        console.log('message: ' + this.message);
    }
}