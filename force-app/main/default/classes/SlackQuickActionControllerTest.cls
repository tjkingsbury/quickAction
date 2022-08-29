@isTest
public with sharing class SlackQuickActionControllerTest {
    
    @isTest
    private sendMessageTest(){

        Account acct = new Account();
        acct.Name = 'Sample Account';
        insert acct;

        Test.startTest();
        SlackQuickActionController.sendSlackMessage(acct.Id, 'test message');
        Test.stopTest();
    }
}
