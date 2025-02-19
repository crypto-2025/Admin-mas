let url = "http://51.20.184.39:1865";
// let url = "https://node.masplatform.net/api/v1";

// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//   url = "http://localhost:1865/api/v1";
// }

const Apiconfigs = {
  //admin
  login: `${url}/admin/login`,
  forgotPassword: `${url}/admin/forgotPassword`,
  resetPassword: `${url}/admin/resetPassword/`,
   //sendToken
  sendTokens: `${url}/admin/sendTokens`,
  
  listorder: `${url}/admin/listOrder`,
  listorderbyid: `${url}/admin/order/`,
  deleteorder: `${url}/admin/deleteAuction`,
  stoporder: `${url}/admin/stopAuction`,
  report: `${url}/admin/listReport`,
  delreport: `${url}/admin/report`,
  
  
  listFee: `${url}/admin/listFee`,
  editFee: `${url}/admin/editFee`,
  dashboard: `${url}/admin/dashboard`,
  moderatorList: `${url}/admin/moderatorList`,
  sendEmail: `${url}/admin/sendEmail`,

  // Ads
  newAds: `${url}/admin/addAdvertisement`,
  listAds: `${url}/admin/listAdvertisement`,
  viewAds: `${url}/admin/viewAdvertisement`,
  editAds: `${url}/admin/editAdvertisement`,
  removeAds: `${url}/admin/removeAdvertisement`,
  activeDeactiveAdvertisement: `${url}/admin/activeDeactiveAdvertisement`,

  adminList: `${url}/admin/adminList`,
  addadmin: `${url}/admin/addAdmin`,
  deladmin: `${url}/admin/deleteAdmin`,
  Permissions: `${url}/admin/setPermissions`,
  subAdmin: `${url}/admin/subAdmin`,
  subAdminList: `${url}/admin/subAdminList`,
  blockUnblockSubAdmin: `${url}/admin/blockUnblockSubAdmin`,
  totalAdminBalance: `${url}/admin/totalAdminBalance`,
  getAdminTotalEarnings: `${url}/admin/getAdminTotalEarnings`,
  referralSetting: `${url}/admin/referralSetting`,
  totalUserFunds: `${url}/admin/totalUserFunds`,



  //user
  userlist: `${url}/admin/userList`,
  profile: `${url}/user/profile`,
  viewUser: `${url}/admin/viewUser/`,
  blockuser: `${url}/admin/blockUser`,
  deleteUser: `${url}/admin/deleteUser`,
  warning: `${url}/admin/sendWarningMessage`,

  transactionList: `${url}/admin/transactionList`,
  transactionUsersList: `${url}/admin/transactionUsersList`,

  auctionNft: `${url}/order/auctionNft/`,
  listBid: `${url}/bid/listBid`,
  staticContentList: `${url}/static/staticContentList`,
  viewStaticPage: `${url}/static/staticContent`,
  editStaticPage: `${url}/static/staticContent`,


  // social
  listSocial: `${url}/admin/listSocial`,
  editSocial: `${url}/admin/editSocial`,
  viewSocial: `${url}/admin/viewSocial`,
  
  
  //content
  landingContentList: `${url}/content/landingContentList`,
  content: `${url}/content/content`,
  uploadFile: `${url}/content/uploadFile`,
  staticSectionList: `${url}/content/staticContentList`,
  updateContentStatus: `${url}/content/updateContentStatus`,

  //banner
  banner: `${url}/admin/banner`,
  listBanners: `${url}/admin/listBanner`,
  changeBannerStatus: `${url}/admin/changeBannerStatus`,
  getBannerDuration: `${url}/admin/getBannerDuration`,
  editBannerDuration: `${url}/admin/editBannerDuration`,

  // application's banners
  bannerApp: `${url}/admin/bannerApp`,
  listAppBanners: `${url}/admin/listAppBanner`,
  getAppBannerDuration: `${url}/admin/getAppBannerDuration`,
  editAppBannerDuration: `${url}/admin/editAppBannerDuration`,
  changeAppBannerStatus: `${url}/admin/changeAppBannerStatus`,

};

export default Apiconfigs;
