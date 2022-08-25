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

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;

    @api invoke() {
        // Add your slack messaging call here

        // Close the modal window and display a success toast
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Message Sent',
                variant: 'success'
            })
        );  
    }
}