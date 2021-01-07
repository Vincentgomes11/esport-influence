export default function(campaignSelected = '', action) {
    if(action.type == 'saveCampaign') {
        console.log("ADD CAMPAIGN", action.campaignSelected)

        return action.campaignSelected;
    } else {
        console.log("REMOVE CAMPAIGN", campaignSelected)

        return campaignSelected;
    }
}