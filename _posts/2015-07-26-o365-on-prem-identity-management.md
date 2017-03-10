---
id: 16454
title: Streamlining O365 and on-premise Identity Management
author: SharePointOscar
layout: post
---
<div  class="vc_row wpb_row section vc_row-fluid " style=' text-align:left;'>
  <div class=" full_section_inner clearfix">
    <div class="vc_col-sm-12 wpb_column vc_column_container">
      <div class="wpb_wrapper">
        <div class="wpb_text_column wpb_content_element ">
          <div class="wpb_wrapper">
            <p>
              <span class='q_dropcap circle' style=' color: #fffff;'>I</span>dentity Management historically has been a daunting task for many organizations.  Now with cloud computing and services such as Office365, organizations are presented with new challenges.  These challenges being synchronization of their user accounts, ensuring compliance as well as deactivating accounts in a timely fashion to reduce security risks.
            </p>
            
            <p>
              Employees that leave the company may not have access to the corporate network, but they may have access to the cloud services such as Office365 at a given point.  Companies must ensure disabling said account in a timely fashion.
            </p>
            
            <p>
              Recently I&#8217;ve had great conversations with a few clients, our focal topic being Identity Management and what options are available to make this as painless as possible. For clients that use Office365 cloud services, there is almost always a need to sync their user accounts with O365.  Not doing this correctly can lead to security risk or exposure.
            </p>
            
            <p>
              So what options do organizations have for Active Directory User Account synchronization? Typically organizations will choose the following two options.  Most small organizations may opt to have Office365 completely manage their accounts.
            </p>
          </div>
        </div>
        
        <div class="vc_empty_space"  style="height: 45px" >
          <span
			class="vc_empty_space_inner"> <span class="empty_space_image"  ></span> </span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="vc_row wpb_row section vc_row-fluid " style=' text-align:left;'>
  <div class=" full_section_inner clearfix">
    <div class="vc_col-sm-6 wpb_column vc_column_container">
      <div class="wpb_wrapper">
        <div class="image_with_text">
          <img itemprop="image" src="http://www.sharepointoscar.com/wp-content/uploads/2015/07/DirectorySyncTool_passwordSync.png" alt="Directory Sync Tool With Password Sync" />
          
          <h2 >
            Directory Sync Tool With Password Sync
          </h2>
          
          <span style="margin: 6px 0px;" class="separator transparent"></span>The Directory Sync tool which syncs your active directory objects to Azure AD within Office 365 and the password sync which retrieves your password hash from active directory and sync&#8217;s it to Azure AD. When both of these tools are used it makes it possible for users to keep the same password in their local domain as well as Office 365. The Directory Sync Tool is flexible in that you have the option to sync your entire directory or only a portion of your active directory, a particular OU for that matter.
        </div>
        
        <div class="wpb_text_column wpb_content_element ">
          <div class="wpb_wrapper">
          </div>
        </div>
        
        <div class="vc_empty_space"  style="height: 32px" >
          <span
			class="vc_empty_space_inner"> <span class="empty_space_image"  ></span> </span>
        </div>
        
        <div class='q_list circle circle_number light animate_list'>
          <strong>THINGS TO CONSIDER</strong></p> 
          
          <ul>
            <li>
              Requires at least one server running DirSync Tool
            </li>
            <li>
              No SSO is possible with this option
            </li>
            <li>
              Credentials are managed on-premise.
            </li>
            <li>
              If account is disabled or deleted, Office365 will also delete or disable said account
            </li>
          </ul>
          
          <p>
            </div> </div> </div> 
            
            <div class="vc_col-sm-6 wpb_column vc_column_container">
              <div class="wpb_wrapper">
                <div class="image_with_text">
                  <img itemprop="image" src="/img/wp-content/uploads/2015/07/ADFSO365.png" alt="Active Directory Federation Services (ADFS)" />
                  
                  <h2 >
                    Active Directory Federation Services (ADFS)
                  </h2>
                  
                  <span style="margin: 6px 0px;" class="separator transparent"></span>Active Directory Federation Services V3 is now a Windows Role on Windows 2012 R2 and does not need to be downloaded separately as previously required. Active Directory Federation Services makes it possible to expose your Active Directory for Authentication purposes to the outside world. You might be asking &#8220;What about security?&#8221;. It is secured via SSL and exposed in most cases only via proxy server. ADFS also configures into a farm, which means that it can span across many servers for load balancing and redundancy purposes. To Office 365, ADFS offloads authentication back to your domain. <span style="font-weight: bold;">This primarily used in single sign on scenarios, where you need your domain name to authenticate against</span>. Office 365 doesn&#8217;t care about your actual domain per se when it comes to authenticating, it really only cares about your user name and password and will only authenticate UPN&#8217;s (<a href="mailto:user@domain.com">user@domain.com</a>). If you need to use single sign on and down level network names (domain\username) you will <span style="font-weight: bold;">require</span> ADFS.
                </div>
                
                <div class="vc_empty_space"  style="height: 32px" >
                  <span
			class="vc_empty_space_inner"> <span class="empty_space_image"  ></span> </span>
                </div>
                
                <div class='q_list circle circle_number light animate_list'>
                  <strong>THINGS TO CONSIDER</strong></p> 
                  
                  <ul>
                    <li>
                      Requires DirSync for synching Usernames and Password hashes
                    </li>
                    <li>
                      Uses on-premise Active Directory for authentication
                    </li>
                    <li>
                      It is critical for the enterprise once implemented, so having redundancy AKA a Farm and load balancing is recommended, which of course incurs additional cost
                    </li>
                    <li>
                      It is absolutely necessary in order for SSO to work
                    </li>
                  </ul>
                  
                  <p>
                    </div> </div> </div> </div></div>
                    
                    <div      class="vc_row wpb_row section vc_row-fluid " style=' text-align:left;'>
                      <div class=" full_section_inner clearfix">
                        <div class="vc_col-sm-12 wpb_column vc_column_container">
                          <div class="wpb_wrapper">
                            <div class="vc_empty_space"  style="height: 32px" >
                              <span
			class="vc_empty_space_inner"> <span class="empty_space_image"  ></span> </span>
                            </div>
                            
                            <div class="custom_font_holder" style=" font-size: 42px; line-height: 44px; font-style: normal; font-weight: 300; color: #a0a0a0; text-decoration: none; padding: 0; margin: 0; text-align: center;">
                              A Modern Approach to Identity Management
                            </div>
                            
                            <div class="vc_empty_space"  style="height: 32px" >
                              <span
			class="vc_empty_space_inner"> <span class="empty_space_image"  ></span> </span>
                            </div>
                            
                            <div class="wpb_text_column wpb_content_element ">
                              <div class="wpb_wrapper">
                                <p>
                                  <span class='q_dropcap circle' style=' color: #fffff;'>W</span>hat if I told you there is another way to streamline the user account management without the need for ADFS and DirSync? Real-time synching, SSO and even gain additional capabilities such as app provisioning and management?
                                </p>
                                
                                <h2>
                                </h2>
                                
                                <h3>
                                </h3>
                                
                                <h3>
                                  Enter The IMaaS (Identity Management As A Service) Era
                                </h3>
                                
                                <p>
                                  Identity Management has evolved in fact.  Companies such as Okta are providing solutions to clients who use services such as Office365 and streamline their user account management.  Basically Okta is riding the O365 Success Wagon 🙂
                                </p>
                                
                                <p>
                                  Okta offers modern identity management for Office365.
                                </p>
                              </div>
                            </div>
                            
                            <div class="wpb_raw_code wpb_content_element wpb_raw_html">
                              <div class="wpb_wrapper">
                                <video x-webkit-airplay="allow" width="800" height="500" preload="metadata" src="https://pdlvimeocdn-a.akamaihd.net/23918/317/297256550.mp4?token2=1437885451_31506bee2f640cb36a9cd051e93d1940&aksessionid=b233a04d231df2a1" poster="https://i.vimeocdn.com/video/493480151.webp?mw=1600&mh=900&q=70" controls=""></video>
                              </div>
                            </div>
                            
                            <div class="wpb_text_column wpb_content_element ">
                              <div class="wpb_wrapper">
                                <p>
                                  Okta is a complete identity management product built as a single cloud-service and designed for both hybrid IT and <strong>cloud-first</strong> IT environments.
                                </p>
                                
                                <p>
                                  The Okta service provides
                                </p>
                                
                                <ul>
                                  <li>
                                    single sign-on
                                  </li>
                                  <li>
                                    provisioning
                                  </li>
                                  <li>
                                    multi-factor authentication
                                  </li>
                                  <li>
                                    configurable security policy
                                  </li>
                                  <li>
                                    directory services and comprehensive reporting – all configured and managed from a single administrator console
                                  </li>
                                </ul>
                                
                                <p>
                                  &nbsp;
                                </p>
                                
                                <div class="microsoft-way" style="font-weight: inherit; font-style: inherit;">
                                  <h3 style="font-weight: 300;">
                                    The Microsoft Approach
                                  </h3>
                                  
                                  <h4>
                                    Multiple Systems, On-prem and Cloud, Delayed Sync
                                  </h4>
                                  
                                  <p>
                                    <img class="diagram" style="font-weight: inherit; font-style: inherit;" src="https://www.okta.com/_media/pages/product-office365/chart-microsoft-way.png" alt="" />
                                  </p>
                                  
                                  <div class="okta-way" style="font-weight: inherit; font-style: inherit;">
                                  </div>
                                  
                                  <div class="row">
                                    <div class="microsoft-way" style="font-weight: inherit; font-style: inherit;">
                                    </div>
                                    
                                    <div class="okta-way" style="font-weight: inherit; font-style: inherit;">
                                      <h3 style="font-weight: 300;">
                                        The Okta Approach
                                      </h3>
                                      
                                      <h4>
                                        Single System, Cloud-centric, Real-time
                                      </h4>
                                      
                                      <div class="svg-wrap" style="font-weight: inherit; font-style: inherit;">
                                        <img class="diagram" style="font-weight: inherit; font-style: inherit;" src="https://www.okta.com/_media/pages/product-office365/chart-okta-way.png" alt="" />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div class="row">
                                    <p style="font-weight: inherit; font-style: inherit;">
                                      Identity management software has evolved over time. Previous generation software was built around periodic synchronization of data. Okta employs a much more modern, event-driven approach. This approach enables delegated authentication to AD at the moment a user attempts to log in. It also keeps user profile data in sync between on-prem AD and Office 365 the moment it changes.
                                    </p>
                                    
                                    <p style="font-weight: inherit; font-style: inherit;">
                                      </div> </div> </div> </div> 
                                      
                                      <div      class="vc_row wpb_row section vc_row-fluid vc_inner " style=' text-align:left;'>
                                        <div class=" full_section_inner clearfix">
                                          <div class="vc_col-sm-12 wpb_column vc_column_container">
                                            <div class="wpb_wrapper">
                                              <div class="vc_empty_space"  style="height: 50px" >
                                                <span
			class="vc_empty_space_inner"> <span class="empty_space_image"  ></span> </span>
                                              </div>
                                              
                                              <div class="custom_font_holder" style=" font-size: 42px; line-height: 44px; font-style: normal; font-weight: 300; color: #a0a0a0; text-decoration: none; padding: 0; margin: 0; text-align: center;">
                                                Microsoft Just Released Azure Active Directory Connect
                                              </div>
                                              
                                              <div class="vc_empty_space"  style="height: 50px" >
                                                <span
			class="vc_empty_space_inner"> <span class="empty_space_image"  ></span> </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div class="wpb_text_column wpb_content_element ">
                                        <div class="wpb_wrapper">
                                          <p>
                                            <span class='q_dropcap circle' style=' color: #fffff;'>A</span>nother option now available to you, is Microsoft&#8217;s recently released Azure Active Directory Connect.  Azure AD Connect makes it easy to integrate on-premise Active Directory, thereby providing your users a common identity across cloud and on-premise apps.
                                          </p>
                                          
                                          <p>
                                            Some of the key Features/Benefits are:
                                          </p>
                                          
                                          <div class='q_list circle circle_number animate_list'>
                                            </p> 
                                            
                                            <ul>
                                              <li>
                                                Companies can provide a common hybrid identity
                                              </li>
                                              <li>
                                                Admins can configure conditional access based on app resource, device and identity, network location
                                              </li>
                                              <li>
                                                Users use common identity to access cloud services such as O365 and third-party apps (ZendDesk, Quickbooks are good examples)
                                              </li>
                                              <li>
                                                Developers can leverage the common identity model and integrate their apps into Active Directory on-premise and Azure AD for cloud apps
                                              </li>
                                            </ul>
                                            
                                            <p>
                                              </div> 
                                              
                                              <h2>
                                              </h2>
                                              
                                              <h2>
                                              </h2></div> </div> </div> </div> </div></div>
                                              
                                              <div      class="vc_row wpb_row section vc_row-fluid " style=' text-align:left;'>
                                                <div class=" full_section_inner clearfix">
                                                  <div class="vc_col-sm-12 wpb_column vc_column_container">
                                                    <div class="wpb_wrapper">
                                                      <div class="wpb_raw_code wpb_content_element wpb_raw_html">
                                                        <div class="wpb_wrapper">
                                                        </div>
                                                      </div>
                                                      
                                                      <div class="vc_empty_space"  style="height: 95px" >
                                                        <span
			class="vc_empty_space_inner"> <span class="empty_space_image"  ></span> </span>
                                                      </div>
                                                      
                                                      <div class="wpb_text_column wpb_content_element ">
                                                        <div class="wpb_wrapper">
                                                          <p style="font-weight: inherit; font-style: inherit;">
                                                            There are trade-offs with any option you choose; are you ok spending on hardware or paying recurring monthly fees?
                                                          </p>
                                                          
                                                          <p style="font-weight: inherit; font-style: inherit;">
                                                            -Oscar
                                                          </p>
                                                        </div>
                                                      </div>
                                                      
                                                      <div class="wpb_text_column wpb_content_element ">
                                                        <div class="wpb_wrapper">
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>