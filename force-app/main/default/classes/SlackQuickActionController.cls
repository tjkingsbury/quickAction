public with sharing class SlackQuickActionController {



    public SlackQuickActionController() {

    }


    @AuraEnabled
    public static void sendSlackMessage(String recordId, String message){
        slackv2.invokePostMessage inv = new slackv2.invokePostMessage();
        slackv2.invokePostMessage.PostMessageRequest req = new slackv2.invokePostMessage.PostMessageRequest();
        req.message = 'hello';
        req.messageDestinationId = 'C0401HYT3C4';
        req.recordId = '0015500001VTrIfAAL';
        List<slackv2.invokePostMessage.PostMessageRequest> reqList = new List<slackv2.invokePostMessage.PostMessageRequest>();
        reqList.add(req);
        slackv2.invokePostMessage.postMessage(reqList);
    }
}
