import { LightningElement, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendSlackMessage from '@salesforce/apex/SlackQuickActionController.sendSlackMessage';

export default class SlackScreenQuickAction extends LightningElement {
    @api recordId;
    @api objectApiName;
    message;

    handleCancel(event) {
       this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleSubmit(e) {
        // Add your slack messaging call here
        sendSlackMessage({recordId : this.recordId, message : this.message})
            .then(() =>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Message Sent',
                        variant: 'success'
                    })
                );  
            })
            .catch(error => {
                this.error = error
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });      
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleMessageChange(event) {
        this.message = event.detail.value;
    }
}