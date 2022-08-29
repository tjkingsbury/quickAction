import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendSlackMessage from '@salesforce/apex/SlackQuickActionController.sendSlackMessage';

export default class SlackScreenQuickAction extends LightningElement {
    disabled = false;
    @api recordId;
    @api objectApiName;
    message = 'This account is red hot!';

    @api invoke() {
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
    }
}