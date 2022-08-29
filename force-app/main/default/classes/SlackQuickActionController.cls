public with sharing class SlackQuickActionController {

    @AuraEnabled
    public static void sendSlackMessage(String recordId, String message){

        List<slackv2__Message_Destination__c> messageDestinationList = [SELECT Id FROM slackv2__Message_Destination__c WHERE Name='df22Slack' LIMIT 1];
        if(!messageDestinationList.isEmpty()){
            slackv2.invokePostMessage inv = new slackv2.invokePostMessage();
            slackv2.invokePostMessage.PostMessageRequest req = new slackv2.invokePostMessage.PostMessageRequest();
            req.message = message;
            req.messageDestinationId = messageDestinationList[0].Id;
            req.recordId = recordId;
            List<slackv2.invokePostMessage.PostMessageRequest> reqList = new List<slackv2.invokePostMessage.PostMessageRequest>();
            reqList.add(req);
            slackv2.invokePostMessage.postMessage(reqList);
        }
        
    }
}
