@isTest
public with sharing class SlackQuickActionControllerTest {
    
    @isTest
    private static void sendMessageTest(){

        slackv2__Message_Destination__c messageDestination = new slackv2__Message_Destination__c();
        messageDestination.Name = 'df22Slack';
        insert messageDestination;
        
        Account acct = new Account();
        acct.Name = 'Sample Account';
        insert acct;

        Test.startTest();
        SlackQuickActionController.sendSlackMessage(acct.Id, 'test message');
        Test.stopTest();
    }
}
