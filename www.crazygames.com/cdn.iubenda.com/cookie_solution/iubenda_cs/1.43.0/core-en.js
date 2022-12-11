! function() {
    "use strict";
    var e = {
        en: {
            banner: {
                title: "Notice",
                paragraph_1: "This website or its third-party tools use cookies, which are necessary to its functioning and required to achieve the purposes illustrated in the cookie policy. If you want to know more or withdraw your consent to all or some of the cookies, please refer to the %{cookie_policy_link}.",
                paragraph_2: "By closing this banner, scrolling this page, clicking a link or continuing to browse otherwise, you agree to the use of cookies.",
                dynamic: {
                    body: 'We[if banner.useThirdParties] and selected third parties[/if] [if not gdprApplies and not lgpdApplies and ccpaApplies]collect personal information.[/if][if gdprApplies or lgpdApplies]use cookies or similar technologies for technical purposes and, with your consent, for[if not banner.listPurposes] other purposes[/if][if banner.listPurposes] %{purposes}[/if][if hasCookiePolicy] as specified in the [link cookie_policy]cookie policy[/link][/if]. Denying consent may make related features unavailable.[if enableTcf and gdprApplies]\nWith respect to advertising, we and selected [link vendors]third parties[/link], may use <em>precise geolocation data, and identification through device scanning</em> in order to <em>store and/or access information on a device</em> and process personal data like your usage data for the following [link adv_pref]advertising purposes[/link]: <em>personalized ads and content, ad and content measurement, audience insights and product development</em>.[/if][if gdprApplies or lgpdApplies][if banner.explicitWithdrawal]\nYou can freely give, deny, or withdraw your consent at any time[if enableTcf and gdprApplies] by accessing the preferences panel[/if].[/if][/if][/if][if ccpaApplies]\nIn case of sale of your personal information, you may opt out by using the link "%{do_not_sell}".[if hasPrivacyPolicy]\nTo find out more about the categories of personal information collected and the purposes for which such information will be used, please refer to our %{privacy_policy}.[/if][/if]\n[if gdprApplies or lgpdApplies][if consentOnScroll or consentOnLinkAndButton or consentOnElement or consentOnContinuedBrowsing or consentOnScrollHorizontal or consentOnDocument][list or]\nYou can consent to the use of such technologies [if banner.acceptButtonDisplay]by using the “[= banner.acceptButtonCaption]” button[/if][if banner.closeButtonDisplay and not banner.closeButtonRejects][or banner.acceptButtonDisplay] by closing this notice[/if][if consentOnScroll][or] by scrolling this page[/if][if consentOnLinkAndButton][or] by interacting with any link or button outside of this notice[/if][if consentOnElement or consentOnDocument][or] by continuing to browse otherwise[/if][/list].[if banner.closeButtonRejects] By closing this notice, you continue without accepting.[/if][/if][if not consentOnScroll and not consentOnLinkAndButton and not consentOnElement and not consentOnContinuedBrowsing and not consentOnScrollHorizontal and not consentOnDocument][if banner.acceptButtonDisplay][list or][if banner.acceptButtonDisplay]\nUse the “[= banner.acceptButtonCaption]” button[/if][if banner.closeButtonDisplay and not banner.closeButtonRejects and not banner.continueWithoutAcceptingButtonDisplay][or] close this notice[/if][/list] to consent to the use of such technologies. [/if][if not banner.acceptButtonDisplay and banner.closeButtonDisplay and not banner.closeButtonRejects]Close this notice to consent to the use of such technologies.[/if][if banner.rejectButtonDisplay][list or][if banner.rejectButtonDisplay]Use the “[= banner.rejectButtonCaption]” button[/if][if (banner.closeButtonDisplay and banner.closeButtonRejects) or banner.continueWithoutAcceptingButtonDisplay][or] close this notice[/if][/list][if banner.rejectButtonDisplay] to continue without accepting.[/if][/if][if not banner.rejectButtonDisplay and ((banner.closeButtonDisplay and banner.closeButtonRejects) or banner.continueWithoutAcceptingButtonDisplay)]Close this notice to continue without accepting.[/if][/if][/if]',
                    or: "or",
                    and: "and",
                    startQuote: "“",
                    endQuote: "”"
                },
                cookie_policy_caption: "cookie policy",
                vendor_list_caption: "third-parties",
                advertising_preferences_caption: "advertising preferences panel",
                do_not_sell_caption: "Do Not Sell My Personal Information",
                privacy_policy_caption: "privacy policy",
                accept_button_caption: "Accept",
                continue_acception_button_caption: "Continue without accepting &rarr;",
                reject_button_caption: "Reject",
                customize_button_caption: "Learn more[if perPurposeConsent or (enableTcf and gdprApplies)] and customize[/if]",
                page_counter_caption: "Press again to continue"
            },
            blocked_overlay: {
                title: "Content is blocked",
                paragraph: "You denied the use of cookies or similar technologies for the purpose of %{purposes}. To view this content, please update your consent preferences.",
                accept_button: "Update"
            },
            modal: {
                save_and_go_back: "Save and go back",
                back: "Back",
                see_full_cookie_policy: "See full Cookie Policy",
                cookie_policy: "Cookie Policy"
            },
            footer: {
                message: "By continuing to browse or by otherwise closing this window, you accept the current cookie settings.",
                btnCaption: "Save and continue"
            },
            tooltips: {
                advertising_related_purposes: {
                    title: "Advertising-related purposes and features",
                    body: "<p>We and selected [link vendors]third parties[/link], may <em>match and combine offline data sources; link different devices; receive and use automatically-sent device characteristics for identification; use precise geolocation data; actively scan device characteristics for identification</em> in order to <em>store and/or access information on a device</em> and process personal data (e.g. browsing data, IP addresses, usage data or unique identifiers) for the following purposes: <em>select basic ads; create a personalized ads profile; select personalized ads; create a personalized content profile; select personalized content; measure ad performance; measure content performance; apply market research to generate audience insights; develop and improve products; ensure security, prevent fraud, and debug; technically deliver ads or content.</em>.</p><p>You can change your ad-related choices at any time, without incurring major limitations, by accessing the [link adv_pref]advertising preferences panel[/link].</p>"
                },
                your_rights: {
                    title: "Your rights",
                    body: "<h3>Your right to withdraw</h3><p>Where the processing of your data is based on consent, you can freely give, deny, or withdraw your consent without incurring major limitations. With respect to advertising-related purposes, you can change your choices at any time by accessing the [link adv_pref]advertising preferences panel[/link].</p>[if not legitimateInterestRestricted]<h3>Your right to object</h3><p>Where we, or selected third parties, rely on a legitimate interest to process your personal data (rather than on your consent), you have the right to object to such processing. More information on “legitimate interest” and on how to exercise your right to object with respect to advertising-related purposes can be found inside the [link adv_pref]advertising preferences panel[/link].</p>[/if]"
                },
                consent: {
                    title: "Processing on the basis of consent",
                    body: "<p>Services that choose to rely on your consent may not process your personal data unless you freely give your consent. You have the right to deny or withdraw your consent without incurring major limitations and to review your choices at any time. By enabling any advertising purpose or individual service, you consent to such processing of your data.</p>"
                },
                legitimate_interest: {
                    title: "Processing on the basis of a legitimate interest",
                    body: "<p>The processing of your personal data (e.g. browsing data, IP addresses, usage data or unique identifiers) by a service may be justified by the presence of a specific interest considered as “legitimate” by the applicable legislation. Therefore, whenever a service chooses to rely on such a legitimate interest your consent is not necessary. To find out more about the specific legitimate interests pursued by each service, please refer to the respective privacy policy.</p><p><strong>You have the right to object to any processing based on legitimate interest without incurring major limitations and you may exercise this right at any time directly within this panel by deselecting the respective checkboxes on a per-purpose or per-service basis.</strong></p>"
                },
                pref_legitimate_interest: {
                    title: "Legitimate interest",
                    body: '<p>A "legitimate interest" is an interest that, according to applicable legislation, justifies the processing of personal data.<br/>Services that choose to rely on a legitimate interest may process your data, unless you object to such processing.</p><p><strong>By deselecting this checkbox, you exercise your right to object.</strong></p>'
                }
            },
            tcf_v2: {
                show_tracking_button: "Customize advertising tracking",
                hide_tracking_button: "Save and return to cookie policy",
                widget_title: "Your TCF-related preferences",
                widget_intro: "The advertising services listed below - also referred to as vendors - adhere to the [link iab_tcf]IAB Transparency and Consent Framework[/link] and allow you to customize your advertising tracking preferences. [if not LIRestricted]Some of them [/if][if LIRestricted]They [/if]only process your personal data with your [tip consent]consent[/tip][if not LIRestricted], while others rely on a [tip legitimate_interest]legitimate interest[/tip][/if]. Please be aware that denying consent for a particular purpose may make related features unavailable.<br/><br/>You can express your preferences for all purposes and services at once via the controls provided below.<br/>These preferences are captured in a digital signal (via the so-called TC String) to ensure and demonstrate that you have validly consented to [if not LIRestricted]or not objected to [/if]advertising purposes. This digital signal is limited to data strictly necessary to achieve such a purpose.",
                widget_iab_title: "Manage preferences for each purpose",
                widget_purposes_title: "Purposes",
                widget_special_purposes_title: "Special purposes",
                widget_features_title: "Features",
                widget_features_intro: "In order to pursue one or more of these purposes, some services may also use the following features and special features",
                widget_special_features_title: "Special features",
                widget_special_features_intro: "The following features allow you to exercise your choice separately from the purpose-related controls. Please note that special features may be used, regardless of the choice indicated, if those features are needed for ensuring security, preventing fraud or debugging.",
                widget_other_providers: "Other providers",
                vendors_section_title: "Manage preferences for each advertising service",
                activate_all_purposes_button: "Accept all",
                deactivate_all_purposes_button: "Reject all",
                purposes_label: "Purposes:",
                legit_purposes_label: "Purposes (legitimate interest):",
                special_features_label: "Special features:",
                special_purposes_label: "Special purposes:",
                features_label: "Features:",
                privacy_policy: "Privacy Policy",
                leg_int_purpose_label: "Allow the processing of your data based on a [tip pref_legitimate_interest]legitimate interest[/tip] for this purpose.",
                leg_int_vendor_label: "Allow this service to process your data based on a [tip pref_legitimate_interest]legitimate interest[/tip].",
                learn_more: "Learn more",
                storage_info: {
                    heading: "Information on device storage and access",
                    label: "Maximum storage duration:",
                    intro: {
                        up_to: "up to",
                        hour: "hour",
                        hours: "hours",
                        day: "day",
                        days: "days",
                        session: "duration of the session",
                        indefinite: "indefinite",
                        cookie_refresh: "since your last interaction"
                    },
                    detailed: {
                        identifier: "Identifier:",
                        method_title: "Method of storage or access:",
                        type: {
                            cookie: "cookie",
                            web: "browser storage",
                            app: "device storage"
                        },
                        duration: "Lifetime:",
                        domain: "Domain:",
                        purposes: "Purposes:"
                    },
                    learn_label: "More information"
                },
                purposes: {
                    1: {
                        name: "Store and/or access information on a device",
                        description: "Cookies, device identifiers, or other information can be stored or accessed on your device for the purposes presented to you.",
                        descriptionLegal: "Vendors can: Store and access information on the device such as cookies and device identifiers presented to a user."
                    },
                    2: {
                        name: "Select basic ads",
                        description: "Ads can be shown to you based on the content you’re viewing, the app you’re using, your approximate location, or your device type.",
                        descriptionLegal: "To do basic ad selection vendors can:<br/><br/>- Use real-time information about the context in which the ad will be shown, to show the ad, including information about the content and the device, such as: device type and capabilities, user agent, URL, IP address<br/>- Use a user’s non-precise geolocation data<br/>- Control the frequency of ads shown to a user.<br/>- Sequence the order in which ads are shown to a user.<br/>- Prevent an ad from serving in an unsuitable editorial (brand-unsafe) context<br/>Vendors cannot:<br/>- Create a personalized ads profile using this information for the selection of future ads.<br/><br/>N.B. Non-precise means only an approximate location involving at least a radius of 500 meters is permitted."
                    },
                    3: {
                        name: "Create a personalized ads profile",
                        description: "A profile can be built about you and your interests to show you personalized ads that are relevant to you.",
                        descriptionLegal: "To create a personalized ads profile vendors can:<br/><br/>- Collect information about a user, including a user's activity, interests, demographic information, or location, to create or edit a user profile for use in personalized advertising.<br/>- Combine this information with other information previously collected, including from across websites and apps, to create or edit a user profile for use in personalized advertising."
                    },
                    4: {
                        name: "Select personalized ads",
                        description: "Personalized ads can be shown to you based on a profile about you.",
                        descriptionLegal: "To select personalized ads vendors can: Select personalized ads based on a user profile or other historical user data, including a user’s prior activity, interests, visits to sites or apps, location, or demographic information."
                    },
                    5: {
                        name: "Create a personalized content profile",
                        description: "A profile can be built about you and your interests to show you personalized content that is relevant to you.",
                        descriptionLegal: "To create a personalized content profile vendors can: <br/><br/>- Collect information about a user, including a user's activity, interests, visits to sites or apps, demographic information, or location, to create or edit a user profile for personalizing content.<br/>- Combine this information with other information previously collected, including from across websites and apps, to create or edit a user profile for use in personalizing content."
                    },
                    6: {
                        name: "Select personalized content",
                        description: "Personalized content can be shown to you based on a profile about you.",
                        descriptionLegal: "To select personalized content vendors can: Select personalized content based on a user profile or other historical user data, including a user’s prior activity, interests, visits to sites or apps, location, or demographic information."
                    },
                    7: {
                        name: "Measure ad performance",
                        description: "The performance and effectiveness of ads that you see or interact with can be measured.",
                        descriptionLegal: "To measure ad performance vendors can:<br/><br/>- Measure whether and how ads were delivered to and interacted with by a user<br/>- Provide reporting about ads including their effectiveness and performance<br/>- Provide reporting about users who interacted with ads using data observed during the course of the user's interaction with that ad<br/>- Provide reporting to publishers about the ads displayed on their property<br/>- Measure whether an ad is serving in a suitable editorial environment (brand-safe) context<br/>- Determine the percentage of the ad that had the opportunity to be seen and the duration of that opportunity<br/>- Combine this information with other information previously collected, including from across websites and apps<br/><br/>Vendors cannot:<br/><br/>- Apply panel or similarly-derived audience insights data to ad measurement data without a Legal Basis to apply market research to generate audience insights (Purpose 9)"
                    },
                    8: {
                        name: "Measure content performance",
                        description: "The performance and effectiveness of content that you see or interact with can be measured.",
                        descriptionLegal: "To measure content performance vendors can:<br/><br/>- Measure and report on how content was delivered to and interacted with by users.<br/>- Provide reporting, using directly measurable or known information, about users who interacted with the content<br/>- Combine this information with other information previously collected, including from across websites and apps.<br/><br/>Vendors cannot:<br/><br/>- Measure whether and how ads (including native ads) were delivered to and interacted with by a user.<br/>- Apply panel- or similarly derived audience insights data to ad measurement data without a Legal Basis to apply market research to generate audience insights (Purpose 9)"
                    },
                    9: {
                        name: "Apply market research to generate audience insights",
                        description: "Market research can be used to learn more about the audiences who visit sites/apps and view ads.",
                        descriptionLegal: "To apply market research to generate audience insights vendors can:<br/><br/>- Provide aggregate reporting to advertisers or their representatives about the audiences reached by their ads, through panel-based and similarly derived insights.<br/>- Provide aggregate reporting to publishers about the audiences that were served or interacted with content and/or ads on their property by applying panel-based and similarly derived insights.<br/>- Associate offline data with an online user for the purposes of market research to generate audience insights if vendors have declared to match and combine offline data sources (Feature 1)<br/>- Combine this information with other information previously collected including from across websites and apps. <br/><br/>Vendors cannot:<br/><br/>- Measure the performance and effectiveness of ads that a specific user was served or interacted with, without a Legal Basis to measure ad performance.<br/>- Measure which content a specific user was served and how they interacted with it, without a Legal Basis to measure content performance."
                    },
                    10: {
                        name: "Develop and improve products",
                        description: "Your data can be used to improve existing systems and software, and to develop new products",
                        descriptionLegal: "To develop new products and improve products vendors can:<br/><br/>- Use information to improve their existing products with new features and to develop new products<br/>- Create new models and algorithms through machine learning<br/><br/>Vendors cannot: Conduct any other data processing operation allowed under a different purpose under this purpose"
                    }
                },
                specialPurposes: {
                    1: {
                        name: "Ensure security, prevent fraud, and debug",
                        description: "Your data can be used to monitor for and prevent fraudulent activity, and ensure systems and processes work properly and securely.",
                        descriptionLegal: "To ensure security, prevent fraud and debug vendors can:<br/><br/>- Ensure data are securely transmitted<br/>- Detect and prevent malicious, fraudulent, invalid, or illegal activity.<br/>- Ensure correct and efficient operation of systems and processes, including to monitor and enhance the performance of systems and processes engaged in permitted purposes<br/><br/>Vendors cannot: Conduct any other data processing operation allowed under a different purpose under this purpose."
                    },
                    2: {
                        name: "Technically deliver ads or content",
                        description: "Your device can receive and send information that allows you to see and interact with ads and content.",
                        descriptionLegal: "To deliver information and respond to technical requests vendors can:<br/><br/>- Use a user’s IP address to deliver an ad over the internet<br/>- Respond to a user’s interaction with an ad by sending the user to a landing page<br/>- Use a user’s IP address to deliver content over the internet<br/>- Respond to a user’s interaction with content by sending the user to a landing page<br/>- Use information about the device type and capabilities for delivering ads or content, for example, to deliver the right size ad creative or video file in a format supported by the device<br/><br/>Vendors cannot: Conduct any other data processing operation allowed under a different purpose under this purpose"
                    }
                },
                features: {
                    1: {
                        name: "Match and combine offline data sources",
                        description: "Data from offline data sources can be combined with your online activity in support of one or more purposes",
                        descriptionLegal: "Vendors can: Combine data obtained offline with data collected online in support of one or more Purposes or Special Purposes."
                    },
                    2: {
                        name: "Link different devices",
                        description: "Different devices can be determined as belonging to you or your household in support of one or more of purposes.",
                        descriptionLegal: "Vendors can:<br/><br/>- Deterministically determine that two or more devices belong to the same user or household<br/>- Probabilistically determine that two or more devices belong to the same user or household<br/>- Actively scan device characteristics for identification for probabilistic identification if users have allowed vendors to actively scan device characteristics for identification (Special Feature 2)"
                    },
                    3: {
                        name: "Receive and use automatically-sent device characteristics for identification",
                        description: "Your device might be distinguished from other devices based on information it automatically sends, such as IP address or browser type.",
                        descriptionLegal: "Vendors can:<br/><br/>- Create an identifier using data collected automatically from a device for specific characteristics, e.g. IP address, user-agent string.<br/>- Use such an identifier to attempt to re-identify a device.<br/><br/>Vendors cannot:<br/><br/>- Create an identifier using data collected via actively scanning a device for specific characteristics, e.g. installed font or screen resolution without users’ separate opt-in to actively scanning device characteristics for identification.<br/>- Use such an identifier to re-identify a device."
                    }
                },
                specialFeatures: {
                    1: {
                        name: "Use precise geolocation data",
                        description: "Your precise geolocation data can be used in support of one or more purposes. This means your location can be accurate to within several meters.",
                        descriptionLegal: "Vendors can: Collect and process precise geolocation data in support of one or more purposes.<br/><br/>N.B. Precise geolocation means that there are no restrictions on the precision of a user’s location; this can be accurate to within several meters."
                    },
                    2: {
                        name: "Actively scan device characteristics for identification",
                        description: "Your device can be identified based on a scan of your device's unique combination of characteristics.",
                        descriptionLegal: "Vendors can:<br/><br/>- Create an identifier using data collected via actively scanning a device for specific characteristics, e.g. installed fonts or screen resolution.<br/>- Use such an identifier to re-identify a device."
                    }
                }
            },
            per_purpose: {
                widget_title: "Your consent preferences",
                widget_intro: 'The following panel allows you to customize your consent preferences for any tracking technology used to help us achieve the features and activities described below.[if hasCookiePolicy] To learn more about how these trackers help us and how they work, refer to the <button style="cursor: pointer; text-decoration: underline !important;" class="open-cp">cookie policy</button>.[/if] You may review and change your choices at any time. Please be aware that denying consent for a particular purpose may make related features unavailable.',
                see_description: "See description",
                see_description_customize: "See description and customize",
                hide_description: "Hide description",
                approve_all: "Accept all",
                reject_all: "Reject all",
                adopts_tcf: "Adopts the IAB Transparency and Consent Framework",
                general_advertising_services: "Other Targeting & Advertising services",
                tcf_adhering_services: "IAB Transparency and Consent Framework adhering services",
                tcf_adhering_services_description: 'These services adhere to the <a target="_blank" rel="noopener" href="https://iabeurope.eu/transparency-consent-framework/">IAB Transparency and Consent Framework</a> (TCF). The TCF is an industry-wide initiative that facilitates responsible privacy practices across the digital advertising industry - providing you with enhanced transparency and control over your advertising tracking preferences.',
                customize_advertising_tracking: "Customize TCF-related preferences",
                purposes: {
                    1: {
                        name: "Strictly necessary",
                        bannerName: "strictly necessary activities",
                        description: "These trackers are used for activities that are strictly necessary to operate or deliver the service you requested from us and, therefore, do not require you to consent."
                    },
                    2: {
                        name: "Basic interactions & functionalities",
                        bannerName: "basic interactions & functionalities",
                        description: "These trackers enable basic interactions and functionalities that allow you to access selected features of our service and facilitate your communication with us."
                    },
                    3: {
                        name: "Experience enhancement",
                        bannerName: "experience enhancement",
                        description: "These trackers help us to provide a personalized user experience by improving the quality of your preference management options, and by enabling the interaction with external networks and platforms."
                    },
                    4: {
                        name: "Measurement",
                        bannerName: "measurement",
                        description: "These trackers help us to measure traffic and analyze your behavior with the goal of improving our service."
                    },
                    5: {
                        name: "Targeting & Advertising",
                        bannerName: "targeting & advertising",
                        description: "These trackers help us to deliver personalized marketing content to you based on your behavior and to operate, serve and track ads."
                    },
                    googleAdsPersonalized: {
                        name: "Personalized advertising by Google and its partners",
                        description: 'Google and its partner ad technology providers use trackers for personalization and measurement purposes. You can customize your consent preferences for both Google and its partners. To learn more, please refer to the <a target="_blank" rel="noopener" href=\'https://support.google.com/admanager/answer/9012903?hl=en\'>privacy policies of the respective services</a>.'
                    }
                }
            },
            ccpa: {
                opt_out_prompt: "Do you really wish to opt out?",
                opt_out_cancel: "Cancel",
                opt_out_confirm: "Confirm"
            },
            google_additional_consent: {
                per_purpose_widget: {
                    title: "Personalized advertising by Google’s Ad Tech Providers",
                    description: "Google’s Ad Tech Providers use tracking technology for advertising purposes. You can customize your preferences for each of them.",
                    customize: "Customize Google-related preferences"
                },
                gac_widget: {
                    title: "Your Google-related preferences",
                    description: "Google’s Ad Tech Providers listed below use tracking technology for advertising purposes. To learn more, please refer to their respective privacy policies. You can customize your consent preferences for each of them or manage your consent for all of them at once using the provided controls."
                },
                tcf_widget: {
                    title: "Personalized advertising by Google’s Ad Tech Providers not adhering to the TCF",
                    description: "Google’s Ad Tech Providers listed below do not adhere to the IAB Transparency and Consent Framework. You can customize your advertising tracking preferences for each of them. To learn more, please refer to their respective privacy policies.",
                    manage_preferences: "Manage preferences for each of Google’s Ad Tech Providers"
                }
            },
            floating_preferences_button: {
                caption: "Privacy preferences"
            }
        }
    };

    function t(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, o)
        }
        return n
    }

    function n(e) {
        for (var n = 1; n < arguments.length; n++) {
            var o = null != arguments[n] ? arguments[n] : {};
            n % 2 ? t(Object(o), !0).forEach((function(t) {
                s(e, t, o[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : t(Object(o)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
            }))
        }
        return e
    }

    function o(e) {
        return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }

    function r(e, t, n) {
        return t && a(e.prototype, t), n && a(e, n), Object.defineProperty(e, "prototype", {
            writable: !1
        }), e
    }

    function s(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function c(e, t) {
        return function(e) {
            if (Array.isArray(e)) return e
        }(e) || function(e, t) {
            var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null == n) return;
            var o, i, a = [],
                r = !0,
                s = !1;
            try {
                for (n = n.call(e); !(r = (o = n.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
            } catch (e) {
                s = !0, i = e
            } finally {
                try {
                    r || null == n.return || n.return()
                } finally {
                    if (s) throw i
                }
            }
            return a
        }(e, t) || p(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function p(e, t) {
        if (e) {
            if ("string" == typeof e) return l(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0
        }
    }

    function l(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
        return o
    }
    window._iub.i18nForBanner = e, window._iub = window._iub || {}, window._iub.jlib = window._iub.jlib || {};
    var u = function(e) {
            return null == e ? [] : Array.isArray(e) ? e : [e]
        },
        d = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
            fatal: 4,
            nolog: 5
        },
        h = function(e, t, n) {
            var o = [t].concat(n);
            console[e].apply ? console[e].apply(console, o) : console[e](o.join(" "))
        },
        m = {
            configure: function() {},
            log: function(e, t) {
                try {
                    if ("console" in window && "log" in console && "warn" in console && "error" in console) {
                        var n = "[IUBCS|" + e.toUpperCase() + "]:";
                        b.LOG_LEVELS[e] < b.WARN ? h("log", n, t) : b.LOG_LEVELS[e] === b.WARN ? h("warn", n, t) : h("error", n, t)
                    }
                } catch (e) {}
            }
        },
        b = new(function() {
            function e() {
                i(this, e), this.DEBUG = 0, this.INFO = 1, this.WARN = 2, this.ERROR = 3, this.FATAL = 4, this.NOLOG = 5, this.LOG_LEVELS = d, this.silence = !1, this.strategies = {}, this.uses = [], this.level = 1, this.slice = [].slice
            }
            return r(e, [{
                key: "silence",
                value: function() {
                    return this.silence = !0, this
                }
            }, {
                key: "wake",
                value: function() {
                    return this.silence = !1, this
                }
            }, {
                key: "registerStrategy",
                value: function(e, t) {
                    return this.strategies[e] = t, this
                }
            }, {
                key: "configure",
                value: function(e, t) {
                    var n = this.strategies[e];
                    return n && "configure" in n && n.configure(t), this
                }
            }, {
                key: "setLevel",
                value: function(e) {
                    var t = e.toLowerCase();
                    return t in d && (this.level = d[t]), this
                }
            }, {
                key: "log",
                value: function(e, t) {
                    var n = this;
                    if (this.silence) return null;
                    var o = u(t),
                        i = e.toLowerCase();
                    return i in d && d[i] >= this.level && this.uses.forEach((function(e) {
                        "function" == typeof e ? e(i, o) : e in n.strategies && n.strategies[e].log(i, o)
                    })), this
                }
            }, {
                key: "use",
                value: function(e) {
                    return e && (this.uses = u(e)), this
                }
            }, {
                key: "debug",
                value: function() {
                    this.log("debug", this.slice.call(arguments))
                }
            }, {
                key: "info",
                value: function() {
                    this.log("info", this.slice.call(arguments))
                }
            }, {
                key: "warn",
                value: function() {
                    this.log("warn", this.slice.call(arguments))
                }
            }, {
                key: "error",
                value: function() {
                    this.log("error", this.slice.call(arguments))
                }
            }, {
                key: "fatal",
                value: function() {
                    this.log("fatal", this.slice.call(arguments))
                }
            }]), e
        }());
    b.registerStrategy("console", m);
    var f = function e(t, n, i, a) {
            var r, s = t || {},
                c = n || {};
            return i ? r = s : (r = {}, Object.keys(s).forEach((function(e) {
                r[e] = s[e]
            }))), a ? Object.keys(c).forEach((function(t) {
                "object" !== o(c[t]) || null === c[t] || c[t] instanceof HTMLElement ? r[t] = c[t] : ("object" !== o(r[t]) && (r[t] = {}), r[t] = e(r[t], c[t], i, !0))
            })) : Object.keys(c).forEach((function(e) {
                r[e] = c[e]
            })), r
        },
        g = function(e, t) {
            return f(e, t, !1, !0)
        },
        v = function(e, t) {
            return f(e, t, !0, !0)
        },
        y = function(e, t) {
            return f({}, e, !0, t)
        },
        k = function() {
            return "template" === _iub.cs.options.googleConsentMode ? (_iub.gtmDataLayer = _iub.gtmDataLayer || [], _iub.gtmDataLayer.pushCommand = _iub.gtmDataLayer.pushCommand || _iub.gtmDataLayer.push, _iub.gtmDataLayer) : window.dataLayer
        },
        C = function() {
            for (var e = k(), t = arguments.length, n = new Array(t), o = 0; o < t; o++) n[o] = arguments[o];
            if ("template" === _iub.cs.options.googleConsentMode) e.pushCommand(n);
            else if ("function" == typeof window.gtag) {
                var i;
                (i = window).gtag.apply(i, n)
            } else void 0 !== e && e.push(n)
        },
        w = !0,
        x = {
            analytics_storage: 4,
            ad_storage: 5,
            functionality_storage: 2,
            personalization_storage: 3,
            security_storage: 2
        },
        P = !1,
        _ = !1,
        A = function(e) {
            if (P) P = !1;
            else {
                _ = !0;
                var t = {};
                Object.keys(x).forEach((function(n) {
                        var o = x[n];
                        e ? e.purposes ? t[n] = e.purposes[o] : t[n] = e.consent : t[n] = !0
                    })),
                    function(e) {
                        var t = _iub.cs.options.googleConsentMode;
                        if (!1 !== t)
                            if ("template" !== t) {
                                var n = function(e) {
                                        if (!e || !e.length) return null;
                                        for (var t = 0; t < e.length; t++) {
                                            var n = e[t];
                                            if (n && "consent" === n[0] && "default" === n[1]) return n[2]
                                        }
                                        return null
                                    }(k()),
                                    o = !w,
                                    i = {};
                                Object.keys(e).forEach((function(t) {
                                    var a = e[t];
                                    if ("undefined" !== a)
                                        if (a) i[t] = "granted";
                                        else if (o) {
                                        var r;
                                        i[t] = null !== (r = n && n[t]) && void 0 !== r ? r : "denied"
                                    }
                                })), 0 !== Object.keys(i).length && (C("consent", "update", i), w = !1)
                            } else C("updateConsent", e)
                    }(t)
            }
        },
        B = function() {
            _ || (_iub.cs.state.needsConsent ? A(_iub.cs.consent) : A(), P = !0)
        },
        S = {
            start: function() {
                !0 === _iub.cs.options.googleConsentMode && (window.dataLayer = window.dataLayer || []), "template" !== this.cs.options.googleConsentMode && C("set", "developer_id.dZTJkMz", !0), this.cs.on("callback.before.onPreferenceExpressedOrNotNeeded", A), this.cs.once("before-activation", B)
            }
        },
        O = {
            cookie_policy: "iubenda-cs-cookie-policy-lnk",
            privacy_policy: "iubenda-privacy-policy-link",
            vendors: "iubenda-vendor-list-link",
            adv_pref: "iubenda-advertising-preferences-link",
            do_not_sell: "iubenda-ccpa-opt-out iubenda-do-not-sell-link"
        },
        T = {
            iab_tcf: "https://iabeurope.eu/transparency-consent-framework/"
        },
        E = [{
            start: /\[or (.+?)\]/,
            end: "",
            exec: function(e, t, n) {
                return R(e, n) ? "[or]" : ""
            }
        }, {
            start: /\[= (.+?)\]/,
            end: "",
            exec: function(e, t, n) {
                return L(n, e.split("."))
            }
        }, {
            start: /\[list (.+?)\]/,
            end: /\[\/list\]/,
            exec: function(e, t, n) {
                return F(t, e)
            }
        }, {
            start: /\[if (.+?)\]/,
            end: /\[\/if\]/,
            exec: function(e, t, n) {
                return R(e, n) ? t : ""
            }
        }, {
            start: /\[tip (.+?)\]/,
            end: /\[\/tip\]/,
            exec: function(e, t) {
                return '<a href="javascript:void();" class="iub-popover-trigger" data-iub-popover="' + e + '">' + t + "</a>"
            }
        }, {
            start: /\[link (.+?)\]/,
            end: /\[\/link\]/,
            exec: function(e, t) {
                var n = O[e] || "",
                    o = t,
                    i = n ? "javascript:void(0)" : T[e] || e;
                if ("cookie_policy" === e) {
                    var a = _iub.cs,
                        r = a.options.banner.cookiePolicyLinkCaption;
                    i = a.ui.getCookiePolicyHref(), r && (o = r)
                }
                return '<a href="' + i + '" class="' + n + '"' + (/^http/i.test(i) ? ' target="_blank" rel="noopener"' : "") + ">" + o + "</a>"
            }
        }],
        N = function e(t, n) {
            for (var o, i = Number.MAX_VALUE, a = 0; a < E.length; a++) {
                var r = E[a],
                    s = t.match(r.start);
                s && s.index < i && (o = {
                    tag: r,
                    match: s
                }, i = s.index)
            }
            if (!o) return t;
            var c = t.substr(0, o.match.index),
                p = o.match.index + o.match[0].length,
                l = e(t.substr(p), n),
                u = l.match(o.tag.end);
            if (!u) return c + o.match[0] + l;
            var d = l.substr(0, u.index),
                h = l.substr(u.index + u[0].length);
            return c + o.tag.exec(o.match[1], d, n) + h
        },
        L = function(e) {
            for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n = e || {}, o = 0; o < t.length; o++) {
                if (!(n[t[o]] instanceof Object)) return o + 1 < t.length && t[o + 1] ? null : n[t[o]];
                n = n[t[o]]
            }
            return n
        },
        I = function(e, t) {
            var n = e.match(/(not)?\s*(.*)/i),
                o = !!n[1],
                i = n[2],
                a = function(e) {
                    var t = e;
                    return "true" === e ? t = !0 : "false" === e && (t = !1), t
                }(i);
            return "string" == typeof a && (a = L(t, i.split("."))), o ? !a : a
        },
        D = function(e, t) {
            for (var n = e.split(/\s+and\s+/i), o = 0; o < n.length; o++)
                if (!I(n[o], t)) return !1;
            return !0
        },
        z = function(e, t) {
            for (var n = e.split(/\s+or\s+/i), o = 0; o < n.length; o++)
                if (D(n[o], t)) return !0;
            return !1
        },
        R = function e(t, n) {
            var o = /\((.+)\)/;
            if (!t.match(o)) return z(t, n);
            var i = t.replace(o, (function(t, o) {
                return e(o, n)
            }));
            return z(i, n)
        },
        F = function(e, t) {
            var n = e.split("[or]"),
                o = e,
                i = t ? " " + t : ",";
            if (n.length <= 1) return o;
            var a = n.pop();
            return n.join(",") + i + a
        },
        j = function(e, t) {
            return N(e, t)
        },
        M = function(e) {
            return Array.prototype.concat.apply([], document.querySelectorAll(e))
        },
        V = function(e, t) {
            return e && e.tagName && e.tagName.toLowerCase() === t.toLowerCase()
        },
        U = function(e, t) {
            var n = (t || document).getElementsByClassName(e);
            return Array.prototype.concat.apply([], n)
        },
        H = function(e) {
            return e && e.length ? M("." + e.join(", .")) : []
        },
        W = function(e, t) {
            for (var n = t.parentNode; null != n;) {
                if (n === e) return !0;
                n = n.parentNode
            }
            return !1
        },
        G = function(e) {
            return document.createElement(e.toUpperCase())
        },
        Y = function(e) {
            e && e.parentNode && e.parentNode.removeChild(e)
        },
        q = function(e, t) {
            var n = e.nextSibling,
                o = e.parentNode;
            Y(e), o.insertBefore(t, n)
        },
        X = function(e, t) {
            return e.parentNode.insertBefore(t, e.nextSibling)
        },
        J = function(e) {
            var t = [],
                n = 0;

            function o(e) {
                t.push(["enter", e]);
                for (var n = 0; n < e.childNodes.length; ++n) o(e.childNodes[n]);
                t.push(["exit", e])
            }
            return {
                reiterate: function() {
                    t = [], o(e)
                },
                next: function() {
                    return n >= t.length ? {
                        done: !0
                    } : {
                        value: t[n++],
                        done: !1
                    }
                }
            }
        },
        K = function(e) {
            var t = e.nodeName.toLowerCase(),
                n = e.getAttribute("type"),
                o = e.hasAttribute("data-iub-script");
            return "script" === t && (!n || o || "application/javascript" === n || "text/javascript" === n || "module" === n)
        },
        Z = function(e) {
            e.hasAttribute("data-iub-type") ? (e.setAttribute("type", e.getAttribute("data-iub-type")), e.removeAttribute("data-iub-type")) : e.removeAttribute("type"), e.removeAttribute("data-iub-script")
        },
        $ = function(e, t) {
            return t && function(e, t) {
                    Object.keys(t).forEach((function(n) {
                        void 0 !== t[n] && null !== t[n] && e.setAttribute(n, t[n])
                    }))
                }(e, t),
                function(e) {
                    for (var t = Array.prototype.concat.apply([], e.attributes), n = {}, o = 0; o < t.length; o++) {
                        var i = t[o],
                            a = i.name,
                            r = i.value;
                        null != r && "null" !== r && "" !== r && (n[a] = r)
                    }
                    return n
                }(e)
        },
        Q = function(e, t) {
            if (t ? "loading" !== document.readyState : "complete" === document.readyState) e();
            else if (t) {
                document.addEventListener("readystatechange", (function t() {
                    document.removeEventListener("readystatechange", t), e()
                }))
            } else {
                window.addEventListener("load", (function t() {
                    window.removeEventListener("load", t), e()
                }))
            }
        },
        ee = function(e) {
            var t = document.createElement("script");
            t.setAttribute("type", "text/javascript"), t.setAttribute("src", e), document.getElementsByTagName("head")[0].appendChild(t)
        },
        te = function(e, t) {
            e.classList.add(t)
        },
        ne = function(e, t) {
            e.classList.remove(t)
        },
        oe = function(e, t) {
            return e.classList.contains(t)
        },
        ie = function(e, t, n) {
            if ("function" == typeof window[e]) return new window[e](t, n);
            var o = (null == n ? void 0 : n.bubbles) || !1,
                i = (null == n ? void 0 : n.cancelable) || !1,
                a = document.createEvent(e);
            return a.initEvent(t, o, i), a
        },
        ae = null;

    function re(e) {
        var t = Object.keys(e).reduce((function(t, n) {
            var o = e[n];
            return t + (o ? n + ":" + o + "!important;" : "")
        }), "");
        return t ? ' style="' + t + '"' : ""
    }
    var se = function(e) {
            try {
                return M(e)
            } catch (e) {
                return []
            }
        },
        ce = function(e, t) {
            if (!e || !e.tagName) return !1;
            for (var n = e.tagName.toLowerCase(), o = 0; o < t.length; o++) {
                var i = t[o];
                if ("string" == typeof i && n === i.toLowerCase()) return !0;
                if (i instanceof HTMLElement && e === i) return !0
            }
            return !1
        },
        pe = function(e, t) {
            for (var n = e.parentNode; null != n;) {
                if (!0 === t(n)) return n;
                n = n.parentNode
            }
            return null
        },
        le = function(e, t, n, i) {
            var a, r = t;
            "msPointerEnabled" in window.navigator && ("touchstart" === r ? r = "MSPointerDown" : "touchmove" === r ? r = "MSPointerMove" : "touchend" === r && (r = "MSPointerUp")), a = "object" === o(i) ? function() {
                if (null !== ae) return ae;
                try {
                    var e = {};
                    Object.defineProperty(e, "capture", {
                        get: function() {
                            return ae = !0, !1
                        }
                    }), window.addEventListener("test", null, e), window.removeEventListener("test", null, e)
                } catch (e) {
                    ae = !1
                }
                return ae
            }() ? i : !!i.capture : !!i, e.addEventListener(r, n, a)
        },
        ue = function(e, t, n, o) {
            e.removeEventListener(t, n, o || !1)
        },
        de = function(e, t) {
            var n = document.createElement("style");
            n.type = "text/css", n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e)), t.appendChild(n)
        },
        he = function e(t) {
            document.body ? t() : setTimeout((function() {
                e(t)
            }), 1)
        },
        me = {
            config: {
                ensureActivation: "tagged",
                consentOnLinkAndButton: void 0,
                consentOnElement: void 0
            },
            TAGGED_ATTRIBUTE: "data-iub-cs-ensure-activation",
            start: function() {
                var e, t = this,
                    n = !1,
                    o = this.config.ensureActivation,
                    i = t.TAGGED_ATTRIBUTE,
                    a = 0;
                if ("none" !== o)
                    if (this.config.consentOnLinkAndButton || -1 !== (this.config.consentOnElement || "").split(",").indexOf("a")) {
                        var r = function() {
                                t.logger.debug("[IUBCS|ensureActivation] all snippets activated restore navigation"), ue(document, "click", s), !n && e && e.target instanceof HTMLAnchorElement && (e.target.click(), n = !0)
                            },
                            s = function(n) {
                                V(n.target, "a") && (t.logger.debug("[IUBCS|ensureActivation] Navigation intercepted"), e = e || n, n.preventDefault())
                            };
                        this.cs.once("start", (function() {
                            t.logger.debug("[IUBCS|ensureActivation] intercepting clicks"), le(document, "click", s)
                        })), this.cs.activator.on("before-activate-snippets", (function(e) {
                            if ("tagged" === o) {
                                for (var n = 0; n < e.length; n++) {
                                    e[n].getAttribute(i) && (a += 1)
                                }
                                0 === a && r()
                            } else a = e.length;
                            t.logger.debug("[IUBCS|ensureActivation] awaiting ", a, " snippets")
                        })), this.cs.activator.on("re-enable-navigation", (function() {
                            r()
                        }));
                        var c = this.cs.activator.on("snippet-activated", (function(e) {
                            ("all" === o || e.getAttribute(i)) && 0 === (a -= 1) && r()
                        }));
                        this.cs.on("activation-done", (function() {
                            t.cs.activator.off(c)
                        }))
                    } else this.logger.debug("ensureActivation disabled by configuration, skipping install.");
                else this.logger.debug("ensureActivation disabled by user, skipping install.")
            }
        },
        be = function() {
            function e() {
                i(this, e), this.userAgent = navigator.userAgent, this.versionSearchString = "", this.dataBrowser = [{
                    string: this.userAgent,
                    subString: "Chrome",
                    identity: "Chrome"
                }, {
                    string: this.userAgent,
                    subString: "MSIE",
                    identity: "Explorer"
                }, {
                    string: this.userAgent,
                    subString: "Trident",
                    identity: "Explorer"
                }, {
                    string: this.userAgent,
                    subString: "Firefox",
                    identity: "Firefox"
                }, {
                    string: this.userAgent,
                    subString: "Safari",
                    identity: "Safari"
                }, {
                    string: this.userAgent,
                    subString: "Opera",
                    identity: "Opera"
                }], this.browser = this.searchString(this.dataBrowser) || "Other", this.version = this.searchVersion(this.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown"
            }
            return r(e, [{
                key: "searchString",
                value: function(e) {
                    var t = e.filter((function(e) {
                            return -1 !== e.string.indexOf(e.subString)
                        })),
                        n = null;
                    return t.length && (this.versionSearchString = t[0].subString, n = t[0].identity), n
                }
            }, {
                key: "searchVersion",
                value: function(e) {
                    var t = e.indexOf(this.versionSearchString);
                    if (-1 === t) return null;
                    var n = e.indexOf("rv:");
                    return "Trident" === this.versionSearchString && -1 !== n ? parseFloat(e.substring(n + 3)) : parseFloat(e.substring(t + this.versionSearchString.length + 1))
                }
            }, {
                key: "isBotAndShouldSkipBots",
                value: function() {
                    return this.isBot() && !this.shouldNotSkipBots()
                }
            }, {
                key: "shouldNotSkipBots",
                value: function() {
                    return /(^\?|&)iub_do_not_skip_bots=true(&|$)/i.test(location.search)
                }
            }, {
                key: "isBot",
                value: function() {
                    return new RegExp("(googlebot/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|hotjar|yahoo|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon|httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis|Chrome-Lighthouse)", "i").test(this.userAgent)
                }
            }, {
                key: "isMobile",
                value: function() {
                    var e = new RegExp("(android|bbd+|meego).+mobile|avantgo|bada/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)/|plucker|pocket|psp|series(4|6)0|symbian|treo|up.(browser|link)|vodafone|wap|windows ce|xda|xiino", "i"),
                        t = new RegExp("1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-", "i"),
                        n = this.userAgent || navigator.vendor || window.opera;
                    return e.test(n) || t.test(n.substr(0, 4))
                }
            }]), e
        }(),
        fe = "en",
        ge = fe,
        ve = function(e, t) {
            for (var n = e, o = 0; n && o < t.length; o++) {
                var i = t[o];
                if (!(i in n)) return null;
                n = n[i]
            }
            return n
        },
        ye = function(t, n) {
            var o, i, a, r = t.split("."),
                s = ve(e[ge], r) || n || t;
            return void 0 === s && ge !== fe && (s = ve(e.en, r)), j(s = s || n || t, null !== (o = null === (i = _iub) || void 0 === i || null === (a = i.cs) || void 0 === a ? void 0 : a.options) && void 0 !== o ? o : {})
        };
    ye.setLang = function(e) {
        ge = e
    };
    var ke = ye;
    window._iub.csTranslate = ke;
    var Ce, we, xe, Pe, _e = function(e) {
            var t = !e.hasAttribute("disabled"),
                n = !e.getAttribute("aria-hidden");
            return t && n && !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        },
        Ae = 'a[href]:not([tabindex="-1"]),button:not([disabled]):not([tabindex="-1"]),[tabindex]:not([tabindex="-1"]),input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]),select:not([disabled]):not([tabindex="-1"]),textarea:not([disabled]):not([tabindex="-1"]),[contenteditable]:not([tabindex="-1"])',
        Be = null,
        Se = !1,
        Oe = [],
        Te = !1,
        Ee = !1,
        Ne = !1,
        Le = function(e) {
            if (Te || null === e.relatedTarget && !Ne) {
                Te = !1;
                var t = e.target;
                if (Be) {
                    var n = document.querySelector(Be);
                    if (!n.contains(t))(function(e, t) {
                        var n = e.querySelectorAll(Ae),
                            o = 0,
                            i = 1;
                        t && (o = n.length - 1, i = -1);
                        for (var a = n[o]; a && !_e(a);) a = n[o += i];
                        return a
                    })(n, Ee).focus()
                }
            }
        },
        Ie = function(e) {
            var t = e.code || e.key;
            Te = "Tab" === t, Ee = event.shiftKey && Te
        },
        De = function() {
            Ne = !0
        },
        ze = function() {
            Ne = !1
        },
        Re = function(e) {
            if (Se || (Se = !0, le(document.body, "focusin", Le), le(window, "keydown", Ie), le(document, "mousedown", De), le(document, "mouseup", ze)), e) Oe.push({
                selector: Be,
                lastActive: document.activeElement
            }), Be = e;
            else {
                var t = Oe.pop();
                t && (Be = t.selector, t.lastActive.focus())
            }
        },
        Fe = function(e) {
            var t = e instanceof HTMLElement ? e : document.querySelector(e);
            if (t) {
                var n = t.querySelectorAll(Ae);
                Array.prototype.slice.call(n).forEach((function(e) {
                    var t = e.getAttribute("tabIndex");
                    e.setAttribute("data-tabenableindex", t || ""), e.setAttribute("tabIndex", -1)
                }))
            }
        },
        je = "iub-popover",
        Me = "iub-popover-header-title",
        Ve = "iub-popover-content-body",
        Ue = "iub-popover-header-close",
        He = "iub-popover-visible",
        We = function(e) {
            var t = e.target;
            if (oe(t, "iub-popover-trigger")) {
                var n = t.getAttribute("data-iub-popover"),
                    o = t.getAttribute("data-iub-popover-title") || ke("tooltips." + n + ".title", ""),
                    i = t.getAttribute("data-iub-popover-body") || ke("tooltips." + n + ".body", "");
                Ge(t, o, i), e.preventDefault()
            }
        },
        Ge = function(e, t, n) {
            var o = _iub.cs.ui,
                i = pe(e, (function(e) {
                    var t = "iubenda-iframe-popup" === e.id;
                    return t && !e._iubPopupInit && (le(e, "click", Xe), e._iubPopupInit = 1), t || oe(e, "iubenda-cs-container")
                }));
            Ye(i), we.innerHTML = t, xe.innerHTML = n, o.bindOpenCmpBtns(Ce), o.bindVendorListBtns(Ce), Ce.offsetWidth, te(i.parentNode, He), Re(".".concat(je))
        },
        Ye = function(e) {
            Ce || ((Ce = document.createElement("div")).className = je, Ce.setAttribute("role", "dialog"), Ce.setAttribute("aria-labelledby", "iub-popover-title"), Ce.setAttribute("aria-describedby", "iub-popover-content"), Ce.innerHTML = ['<div class="iub-popover-header">', '<h2 class="' + Me + '" id="iub-popover-title">[POPOVER TITLE]</h2>', '<button class="' + Ue + '">&times</button>', "</div>", '<div class="iub-popover-content" id="iub-popover-content">', '<div class="' + Ve + '">[POPOVER CONTENT]</div>', "</div>"].join(""), le(Ce, "click", qe)), e.appendChild(Ce), we || (we = Je(Me)), xe || (xe = Je(Ve)), Pe || (Pe = Je(Ue))
        },
        qe = function(e) {
            oe(e.target, Ue) && $e()
        },
        Xe = function(e) {
            var t = e.target;
            t === Ce || W(Ce, t) || $e(), e.stopPropagation()
        },
        Je = function(e) {
            return U(e)[0]
        },
        Ke = function(e) {
            le(e, "click", We)
        },
        Ze = function() {
            return !!Je(He)
        },
        $e = function() {
            if (Ce && Ce.parentNode) {
                var e = Je(He);
                e && (Re(), ne(e, He), setTimeout((function() {
                    Ce.parentNode.removeChild(Ce)
                }), 300))
            }
        },
        Qe = function() {
            function e(t, n, o) {
                i(this, e), this.rootNode = window.document.createElement("div"), this.buttonNode = window.document.createElement("button"), this.buttonNode.className = o, this.buttonNode.innerHTML = t, this.onClick = n, this.bindHTML(), this.bindEvents()
            }
            return r(e, [{
                key: "bindHTML",
                value: function() {
                    this.rootNode.innerHTML = "", this.rootNode.appendChild(this.buttonNode)
                }
            }, {
                key: "bindEvents",
                value: function() {
                    var e = this;
                    this.buttonNode.addEventListener("click", (function(t) {
                        e.onClick(self, t)
                    }))
                }
            }, {
                key: "getRootNode",
                value: function() {
                    return this.rootNode
                }
            }, {
                key: "getButtonNode",
                value: function() {
                    return this.buttonNode
                }
            }]), e
        }(),
        et = function() {
            function e(t, n, o, a, r, s) {
                i(this, e), this.id = n, this.rootNode = window.document.createElement("div"), this.rootNode.className = "purposes-item purpose-item-" + this.id, s && te(this.rootNode, "purposes-item-shown"), this.optionNode = window.document.createElement("input"), this.optionNode.type = "checkbox", this.optionNode.name = n, this.optionNode.checked = o, this.parent = t, this.description = a, this.disableCollapse = s, this.onChange = r, this.bindHTML(), this.bindEvents()
            }
            return r(e, [{
                key: "bindHTML",
                value: function() {
                    this.rootNode.innerHTML = '<div class="purposes-item-header">\n  <div class="purposes-item-title">\n    <div>\n      <label for="purpose-'.concat(this.id, '">').concat(ke("per_purpose.purposes.".concat(this.id, ".name")), '</label>\n    </div>\n    <button\n      class="purposes-item-title-btn"\n      data-str-off="').concat(ke("per_purpose.see_description"), '"\n      data-str-on="').concat(ke("per_purpose.hide_description"), '"\n      ').concat(this.disableCollapse ? 'style="display: none !important"' : "", "\n    >\n      ").concat(ke("per_purpose.see_description"), '\n    </button>\n  </div>\n  <div class="iub-toggle-checkbox purposes-checkbox"></div>\n</div>\n<div class="purposes-item-body">\n  ').concat(ke("per_purpose.purposes.".concat(this.id, ".description")), "\n</div>"), this.rootNode.getElementsByClassName("purposes-checkbox")[0].appendChild(this.optionNode), this.optionNode.className = "style1"
                }
            }, {
                key: "bindEvents",
                value: function() {
                    var e = this;
                    this.optionNode.addEventListener("change", (function(t) {
                        e.onChange(e, t)
                    }));
                    var t = this.rootNode.getElementsByClassName("purposes-item-title-btn")[0];
                    t.onclick = function() {
                        e.toggleDescription(t)
                    }
                }
            }, {
                key: "showDescription",
                value: function(e) {
                    var t = this;
                    te(this.rootNode, "purposes-item-shown"), e.innerHTML = e.getAttribute("data-str-on"), setTimeout((function() {
                        return t.rootNode.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest"
                        })
                    }), 200)
                }
            }, {
                key: "hideDescription",
                value: function(e) {
                    ne(this.rootNode, "purposes-item-shown"), e.innerHTML = e.getAttribute("data-str-off")
                }
            }, {
                key: "isDescriptionHidden",
                value: function() {
                    return !oe(this.rootNode, "purposes-item-shown")
                }
            }, {
                key: "toggleDescription",
                value: function(e) {
                    this.isDescriptionHidden() ? this.showDescription(e) : this.hideDescription(e)
                }
            }, {
                key: "setValue",
                value: function(e) {
                    this.optionNode.checked = e, this.onChange(this, null)
                }
            }, {
                key: "getRootNode",
                value: function() {
                    return this.rootNode
                }
            }, {
                key: "getOptionNode",
                value: function() {
                    return this.optionNode
                }
            }]), e
        }(),
        tt = function() {
            function e(t, n) {
                i(this, e), this.rootNode = window.document.createElement("div"), this.rootNode.className = "purposes-item purposes-item-5", n && this.isTcfEnabled(t.cookieSolution) && te(this.rootNode, "purposes-item-shown"), this.parent = t, this.disableCollapse = n, this.cookieSolution = t.cookieSolution, this.bindHTML(), this.bindEvents(), this.rootToggleFocusNode = this.rootNode.querySelectorAll(".purposes-item-body")[1]
            }
            return r(e, [{
                key: "bindHTML",
                value: function() {
                    var e = "";
                    this.isTcfEnabled(this.cookieSolution) && (e = '        <div class="purposes-sub-container generic-ads-container" style="display: none !important">        <div>          <div>            <label for="purpose-5">' + ke("per_purpose.general_advertising_services") + '</label>          </div>          <div class="iub-toggle-checkbox purposes-checkbox generic-ads-option-container">          </div>        </div>      </div>'), this.rootNode.innerHTML = '<div class="purposes-item-header" style="display: none !important;">      <div class="purposes-item-title">        <div style="flex-direction: column;align-items: flex-start!important;justify-content: flex-start!important;">          <label for="iub-checkbox4">' + ke("per_purpose.purposes.5.name") + '</label>          <span class="purposes-badge purposes-badge-primary" style="display: none !important">' + ke("per_purpose.adopts_tcf") + '</span>        </div>        <button class="purposes-item-title-btn" data-str-off="' + ke("per_purpose.see_description_customize") + '" data-str-on="' + ke("per_purpose.hide_description") + '"' + (this.disableCollapse ? ' style="display: none !important"' : "") + ">" + ke("per_purpose.see_description_customize") + '</button>      </div>      <div class="iub-toggle-checkbox purposes-checkbox">        <input class="style1 primary-option" id="iub-checkbox4" type="checkbox"/>      </div>    </div>    <div class="purposes-item-body">      <div>        <p>' + ke("per_purpose.purposes.5.description") + '</p>      </div>    </div>    <div class="purposes-item-body">      <div class="purposes-sub-container tcf-container" style="display: none !important">        <div>          <div>            <label for="iub-checkbox5">' + ke("per_purpose.tcf_adhering_services") + '</label>          </div>          <div class="iub-toggle-checkbox purposes-checkbox">            <input class="style1 sm tcf-option" id="iub-checkbox5" type="checkbox"/>          </div>        </div>        <div>          <p>' + ke("per_purpose.tcf_adhering_services_description") + '</p>          <p><button class="iub-btn iub-btn-config purposes-btn purposes-btn-tcf purposes-btn-config">' + ke("per_purpose.customize_advertising_tracking") + '</button></p>        </div>      </div>      <div class="purposes-sub-container google-ads-container" style="display: none !important">        <div>          <div>            <label>' + ke("per_purpose.purposes.googleAdsPersonalized.name") + '</label>          </div>          <div class="iub-toggle-checkbox purposes-checkbox google-option-container">          </div>        </div>        <div>          <p>' + ke("per_purpose.purposes.googleAdsPersonalized.description") + '</p>        </div>      </div>      <div class="purposes-sub-container google-additional-consent-container" style="display: none !important">        <div>          <div>            <label for="iub-checkbox6">' + ke("google_additional_consent.per_purpose_widget.title") + '</label>          </div>          <div class="iub-toggle-checkbox purposes-checkbox google-additional-consent-option-container">            <input class="style1 sm google-additional-consent-option" id="iub-checkbox6" type="checkbox"/>          </div>        </div>        <div>          <p>' + ke("google_additional_consent.per_purpose_widget.description") + '</p>          <p><button class="iub-btn iub-btn-config purposes-btn google-additional-consent-btn purposes-btn-config">' + ke("google_additional_consent.per_purpose_widget.customize") + "</button></p>        </div>      </div>" + e + "</div>", this.isTcfEnabled(this.cookieSolution) && (this.rootNode.querySelector(".purposes-badge-primary").style.display = "", this.rootNode.querySelector(".tcf-container").style.display = "", this.rootNode.querySelector(".purposes-item-header").style.display = "", this.googleAdditionalConsentOptionNode = this.rootNode.querySelector(".google-additional-consent-option")), this.primaryOptionNode = this.rootNode.querySelector(".primary-option"), this.tcfOptionNode = this.rootNode.querySelector(".tcf-option")
                }
            }, {
                key: "isTcfEnabled",
                value: function(e) {
                    return e.options.enableTcf && e.options.gdprApplies
                }
            }, {
                key: "setupGenericAdsPurpose",
                value: function() {
                    var e = this;
                    if (this.isTcfEnabled(this.cookieSolution)) {
                        var t = this.parent.getOptionNodeByID(5);
                        t && (Y(t.parentNode.parentNode.parentNode), this.rootNode.getElementsByClassName("generic-ads-option-container")[0].appendChild(t), t.className = "style1 sm", this.rootNode.getElementsByClassName("generic-ads-container")[0].style.display = "", this.genericAdsOption = t, this.genericAdsOption && this.genericAdsOption.addEventListener("change", (function() {
                            e.updateAdsSectionUI()
                        })), Fe(this.rootToggleFocusNode))
                    }
                }
            }, {
                key: "setupGoogleAdditionalConsentOption",
                value: function() {
                    var e = this.cookieSolution.options;
                    1 !== e.tcfVersion && e.googleAdditionalConsentMode && e.enableTcf && (this.rootNode.getElementsByClassName("google-additional-consent-container")[0].style.display = "")
                }
            }, {
                key: "setupTCFGoogleAdsOption",
                value: function() {
                    if (this.cookieSolution.options.googleAdsPreferenceManagement && this.isTcfEnabled(this.cookieSolution)) {
                        var e = this.getTCFGoogleOption(),
                            t = this.cookieSolution.ui.cmpWidget._customPurposeListView,
                            n = e._checkbox;
                        this.rootNode.getElementsByClassName("google-ads-container")[0].style.display = "", this.rootNode.getElementsByClassName("google-option-container")[0].appendChild(n), e._root.remove(), n.className = "style1 sm", 1 === this.cookieSolution.options.tcfVersion && 1 === t._purposes.length && (t._root.parentNode.getElementsByClassName("other-providers-title")[0].remove(), t._root.remove()), this.tcfGoogleOption = n
                    }
                }
            }, {
                key: "getTCFGoogleOption",
                value: function() {
                    if (!this.isTcfEnabled(this.cookieSolution) || !this.cookieSolution.ui.cmpWidget._customPurposeListView) return null;
                    for (var e = this.cookieSolution.ui.cmpWidget._customPurposeListView._purposeViews, t = 0; t < e.length; ++t)
                        if ("googleAdsPersonalized" === e[t]._id) return e[t];
                    return null
                }
            }, {
                key: "bindEvents",
                value: function() {
                    var e = this,
                        t = this.rootNode.getElementsByClassName("purposes-item-title-btn")[0];
                    t.onclick = function() {
                        e.toggle(t)
                    }, this.rootNode.getElementsByClassName("purposes-btn-tcf")[0].onclick = function() {
                        e.parent.fireEvent("open-tcf")
                    }, this.rootNode.getElementsByClassName("google-additional-consent-btn")[0].onclick = function() {
                        e.parent.fireEvent("open-google-additional-consent")
                    }, this.primaryOptionNode.addEventListener("change", (function() {
                        var t = e.primaryOptionNode.checked;
                        e.unsetMiddlePrimaryOption(), e.genericAdsOption && (e.genericAdsOption.checked = t), e.tcfOptionNode && (e.tcfOptionNode.checked = t), e.tcfGoogleOption && (e.tcfGoogleOption.checked = t), e.googleAdditionalConsentOptionNode && (e.googleAdditionalConsentOptionNode.checked = t), e.updateAdsSectionUI()
                    }))
                }
            }, {
                key: "updateAdsSectionUI",
                value: function() {
                    var e, t, n = 0;
                    n += this.genericAdsOption ? 1 : 0, n += this.tcfOptionNode ? 1 : 0, n += this.googleAdditionalConsentOptionNode ? 1 : 0;
                    var o = 0;
                    return o += +(null === (e = this.genericAdsOption) || void 0 === e ? void 0 : e.checked) || 0, o += +(null === (t = this.tcfOptionNode) || void 0 === t ? void 0 : t.checked) || 0, 0 === (o += +this.googleAdditionalConsentOptionNode.checked || 0) ? (this.unsetMiddlePrimaryOption(), void(this.primaryOptionNode.checked = !1)) : o < n || this.isPartialConsentOnAdsSection() ? (this.setMiddlePrimaryOption(), void(this.primaryOptionNode.checked = !0)) : o === n ? (this.unsetMiddlePrimaryOption(), void(this.primaryOptionNode.checked = !0)) : void 0
                }
            }, {
                key: "isPartialConsentOnAdsSection",
                value: function() {
                    var e = !!this.tcfOptionNode && oe(this.tcfOptionNode, "half"),
                        t = !!this.genericAdsOption && oe(this.genericAdsOption, "half"),
                        n = !!this.googleAdditionalConsentOptionNode && oe(this.googleAdditionalConsentOptionNode, "half");
                    return e || t || n
                }
            }, {
                key: "saveEdits",
                value: function() {
                    this.genericAdsOption && this.cookieSolution.purposesPreference.setPreference(5, this.genericAdsOption.checked), this.tcfOptionNode && this.tcfOptionNode.dispatchEvent(ie("Event", "save-button-clicked")), this.tcfGoogleOption && this.tcfGoogleOption.dispatchEvent(ie("Event", "save-button-clicked")), this.googleAdditionalConsentOptionNode && this.googleAdditionalConsentOptionNode.dispatchEvent(ie("Event", "save-button-clicked")), this.cookieSolution.ui.CPiFrame.updatePerPurposeWidget()
                }
            }, {
                key: "expand",
                value: function(e) {
                    var t = this;
                    te(this.rootNode, "purposes-item-shown"), e.innerHTML = e.getAttribute("data-str-on"),
                        function(e) {
                            var t = e instanceof HTMLElement ? e : document.querySelector(e);
                            if (t) {
                                var n = t.querySelectorAll("[data-tabenableindex]");
                                Array.prototype.slice.call(n).forEach((function(e) {
                                    var t = e.getAttribute("data-tabenableindex");
                                    t ? e.setAttribute("tabIndex", t) : e.removeAttribute("tabIndex"), e.removeAttribute("data-tabenableindex")
                                }))
                            }
                        }(this.rootToggleFocusNode), setTimeout((function() {
                            return t.rootNode.children[1].scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            })
                        }), 200)
                }
            }, {
                key: "collapse",
                value: function(e) {
                    ne(this.rootNode, "purposes-item-shown"), e.innerHTML = e.getAttribute("data-str-off"), Fe(this.rootToggleFocusNode)
                }
            }, {
                key: "isCollapsed",
                value: function() {
                    return !oe(this.rootNode, "purposes-item-shown")
                }
            }, {
                key: "toggle",
                value: function(e) {
                    this.isCollapsed() ? this.expand(e) : this.collapse(e)
                }
            }, {
                key: "getRootNode",
                value: function() {
                    return this.rootNode
                }
            }, {
                key: "setMiddlePrimaryOption",
                value: function() {
                    oe(this.primaryOptionNode, "half") || te(this.primaryOptionNode, "half")
                }
            }, {
                key: "unsetMiddlePrimaryOption",
                value: function() {
                    ne(this.primaryOptionNode, "half")
                }
            }]), e
        }(),
        nt = function(e) {
            var t = e || window.event;
            t.stopPropagation && t.stopPropagation(), null !== t.cancelBubble && (t.cancelBubble = !0)
        },
        ot = function() {
            function e(t) {
                var n = this;
                i(this, e), this.rootNode = window.document.createElement("div"), this.rootNode.className = "iubenda purposes-widget", this.cookieSolution = t, this.disablePurposesCollapse = !t.options.showPurposesCollapsed, this.rejectAllButton = new Qe(ke("per_purpose.reject_all"), (function() {
                    n.expressForAllOptions(!1)
                }), "iub-btn iub-btn-consent iub-btn-reject purposes-btn purposes-btn-reject"), this.approveAllButton = new Qe(ke("per_purpose.approve_all"), (function() {
                    n.expressForAllOptions(!0)
                }), "iub-btn iub-btn-consent iub-btn-accept purposes-btn purposes-btn-accept"), this.adsSection = new tt(this, this.disablePurposesCollapse), this.options = [], this.events = {}, this.populateOptions(), this.bindHTML(), this.bindEvents(), this.adsSection.setupGenericAdsPurpose()
            }
            return r(e, [{
                key: "bindHTML",
                value: function() {
                    this.rootNode.innerHTML = '      <div class="purposes-content">        <div class="purposes-header">          <h1 class="purposes-header-title">' + ke("per_purpose.widget_title") + '</h1>          <p class="purposes-header-text">              ' + ke("per_purpose.widget_intro") + '          </p>        </div>        <div class="purposes-body">          <div class="purposes-items">            <div class="purposes-first">              <label for="iub-checkbox0">Accept or reject all</label>              <div class="iub-toggle-checkbox purposes-checkbox">                <input id="iub-checkbox0" type="checkbox" class="style1" />              </div>            </div>            <div class="iub-consent-buttons purposes-buttons"></div>        </div>      </div>      ';
                    var e = this.rootNode.getElementsByClassName("purposes-buttons")[0],
                        t = this.rootNode.getElementsByClassName("purposes-items")[0];
                    e.appendChild(this.rejectAllButton.getRootNode()), e.appendChild(this.approveAllButton.getRootNode());
                    for (var n = 0; n < this.options.length; ++n) t.appendChild(this.options[n].getRootNode());
                    t.appendChild(this.adsSection.getRootNode());
                    var o = this.getOptionNodeByID(1);
                    o.className = "style1 locked", o.disabled = !0, this.strictlyNecessaryPurposeOption = o
                }
            }, {
                key: "bindEvents",
                value: function() {
                    var e = this;
                    this.rootNode.addEventListener("click", (function(e) {
                        nt(e)
                    }));
                    for (var t = this.rootNode.getElementsByClassName("open-cp"), n = 0; n < t.length; ++n) t[n].addEventListener("click", (function(t) {
                        nt(t), e.fireEvent("open-cookie-policy")
                    }))
                }
            }, {
                key: "populateOptions",
                value: function() {
                    for (var e = this, t = this.cookieSolution.purposes.toIDArray(), n = 0; n < t.length; ++n) {
                        var o = t[n],
                            i = this.cookieSolution.purposesPreference.getPreferenceByPurposeID(o) || !1,
                            a = new et(this, o, i, "Description", (function(t, n) {
                                e.onOptionChange(t, n)
                            }), this.disablePurposesCollapse);
                        a.optionNode.id = "purpose-" + o, this.options.push(a)
                    }
                }
            }, {
                key: "expressForAllOptions",
                value: function(e) {
                    for (var t = 0; t < this.options.length; ++t) "purpose-1" !== this.options[t].optionNode.id && this.options[t].setValue(e);
                    this.cookieSolution.options.enableTcf && (this.adsSection.unsetMiddlePrimaryOption(), this.adsSection.primaryOptionNode.checked = e, this.adsSection.primaryOptionNode.dispatchEvent(ie("Event", "change")))
                }
            }, {
                key: "onOptionChange",
                value: function(e) {
                    var t = e.optionNode.name;
                    this.cookieSolution.purposesPreference.setPreference(t, e.optionNode.checked)
                }
            }, {
                key: "hide",
                value: function() {
                    this.rootNode.style.setProperty("display", "none", "important"), this.fireEvent("on-hide")
                }
            }, {
                key: "getOptionNodeByID",
                value: function(e) {
                    return this.rootNode.getElementsByClassName("purposes-items")[0].querySelector("#purpose-" + e)
                }
            }, {
                key: "show",
                value: function() {
                    this.rootNode.style.removeProperty("display"), this.fireEvent("on-show")
                }
            }, {
                key: "getRootNode",
                value: function() {
                    return this.rootNode
                }
            }, {
                key: "addEventListener",
                value: function(e, t) {
                    this.events[e] || (this.events[e] = []), this.events[e].push(t)
                }
            }, {
                key: "fireEvent",
                value: function(e, t) {
                    var n = this.events[e];
                    if (n && 0 !== n.length)
                        for (var o = 0; o < n.length; ++o) n[o](t)
                }
            }]), e
        }(),
        it = function() {
            function e(t) {
                i(this, e), this.object = t || {}, this.listenersMap = {}, this.object.__iubJlibEmitterListeners__ = this.listenersMap, this.object.on = this.on.bind(this), this.object.once = this.once.bind(this), this.object.off = this.off.bind(this), this.object.emit = this.emit.bind(this)
            }
            return r(e, [{
                key: "getListeners",
                value: function(e) {
                    return this.listenersMap[e] = this.listenersMap[e] || [], this.listenersMap[e]
                }
            }, {
                key: "addListener",
                value: function(e, t, n) {
                    this.getListeners(e).unshift({
                        fn: t,
                        once: !!n
                    })
                }
            }, {
                key: "on",
                value: function(e, t) {
                    return this.addListener(e, t), this.object
                }
            }, {
                key: "once",
                value: function(e, t) {
                    return this.addListener(e, t, !0), this.object
                }
            }, {
                key: "off",
                value: function(e, t) {
                    for (var n = this.getListeners(e), o = n.length - 1; o >= 0; o--) n[o].fn === t && n.splice(o, 1);
                    return this.object
                }
            }, {
                key: "emit",
                value: function(e) {
                    for (var t = this.getListeners(e), n = t.length - 1; n >= 0; n--) {
                        var o = t[n],
                            i = Array.prototype.slice.call(arguments, 1);
                        o.once && t.splice(n, 1), o.fn.apply(null, i)
                    }
                }
            }]), e
        }(),
        at = function(e) {
            return new it(e)
        },
        rt = function e(t) {
            if ("function" == typeof t) {
                var n = e();
                return t(n.resolve.bind(n)), n
            }
            return {
                _data: null,
                _isResolved: !1,
                _successCallbacks: [],
                then: function(e) {
                    !1 === this._isResolved ? this._successCallbacks.push(e) : e.call(window, this._data)
                },
                resolve: function(e) {
                    if (this._isResolved) console && console.log("The promise cannot be resolved more than once");
                    else {
                        this._isResolved = !0, this._data = e;
                        for (var t = 0, n = this._successCallbacks.length; t < n; t++) this._successCallbacks[t].call(window, e)
                    }
                    return this
                }
            }
        },
        st = function(e) {
            var t = rt(),
                n = [],
                o = 0;
            return e.forEach((function(i, a) {
                i.then((function(i) {
                    return function(i, a) {
                        n[a] = i, o++, e.length === o && t.resolve(n)
                    }(i, a)
                }))
            })), t
        },
        ct = !1,
        pt = !1,
        lt = !1,
        ut = function() {
            if (!ct) {
                var e = document.getElementsByTagName("head")[0];
                de(".iubenda-alert{position:fixed!important;top:0!important;left:0!important;width:100%!important;height:100%!important;z-index:2147483647!important;background-color:rgba(0,0,0,.5)!important;font-family:\"Helvetica Neue\",-apple-system,sans-serif!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:16px!important}.iubenda-alert *{font-size:100%!important;width:auto!important;-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;background:0 0!important;box-sizing:border-box!important;-webkit-tap-highlight-color:transparent!important;-webkit-backface-visibility:hidden!important;backface-visibility:hidden!important;font-family:-apple-system,sans-serif!important;text-decoration:none!important;color:currentColor!important;background-attachment:scroll!important;background-color:transparent!important;background-image:none!important;background-position:0 0!important;background-repeat:repeat!important;border:0!important;border-color:#000!important;border-color:currentColor!important;border-radius:0!important;border-style:none!important;border-width:medium!important;bottom:auto!important;clear:none!important;clip:auto!important;counter-increment:none!important;counter-reset:none!important;direction:inherit!important;float:none!important;font-style:inherit!important;font-variant:normal!important;font-weight:inherit!important;height:auto!important;left:auto!important;letter-spacing:normal!important;line-height:inherit!important;list-style-type:inherit!important;list-style-position:outside!important;list-style-image:none!important;margin:0!important;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:1;overflow:visible!important;padding:0!important;position:static!important;quotes:\"\" \"\"!important;right:auto!important;table-layout:auto!important;text-align:left!important;text-indent:0!important;text-transform:none!important;top:auto!important;unicode-bidi:normal!important;vertical-align:baseline!important;visibility:inherit!important;white-space:normal!important;width:auto!important;word-spacing:normal!important;z-index:auto!important;background-origin:padding-box!important;background-origin:padding-box!important;background-clip:border-box!important;background-size:auto!important;-o-border-image:none!important;border-image:none!important;border-radius:0!important;border-radius:0!important;box-shadow:none!important;-moz-column-count:auto!important;column-count:auto!important;-moz-column-gap:normal!important;column-gap:normal!important;-moz-column-rule:medium none #000!important;column-rule:medium none #000!important;-moz-column-span:none!important;column-span:none!important;-moz-column-width:auto!important;column-width:auto!important;font-feature-settings:normal!important;overflow-x:visible!important;overflow-y:visible!important;-webkit-hyphens:manual!important;hyphens:manual!important;perspective:none!important;perspective-origin:50% 50%!important;text-shadow:none!important;transition:all 0s ease 0s!important;transform:none!important;transform-origin:50% 50%!important;transform-style:flat!important;word-break:normal!important}.iubenda-alert .iubenda-alert-dialog{margin:16px!important;width:100%!important;border-radius:6px!important;background-color:#111!important;color:#f4f4f4!important}@media (min-width:320px){.iubenda-alert .iubenda-alert-dialog{width:320px!important}}.iubenda-alert .iubenda-alert-dialog .iubenda-alert-dialog-content{padding:24px 24px 0!important}.iubenda-alert .iubenda-alert-dialog .iubenda-alert-dialog-buttons{padding:24px!important;display:flex!important}.iubenda-alert .iubenda-alert-dialog .iubenda-alert-dialog-buttons button{flex:1!important}.iubenda-alert button{flex:1!important;-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;margin:4px!important;padding:8px 16px!important;border-radius:64px!important;cursor:pointer!important;font-weight:700!important;font-size:100%!important;border:1px solid transparent!important;color:#fff;text-align:center!important}.iubenda-alert button:hover{border-color:currentColor!important}.iubenda-alert button.iubenda-button-confirm{background-color:#0073ce!important}.iubenda-alert button.iubenda-button-cancel{background-color:rgba(255,255,255,.1)!important}#iubenda-iframe .iub-toggle-checkbox{flex-shrink:0!important;display:flex!important;align-items:center!important;margin-left:24px!important}#iubenda-iframe .iub-toggle-checkbox input{-moz-appearance:none!important;appearance:none!important;-webkit-appearance:none!important;padding:0!important;border:0!important;margin:0!important}#iubenda-iframe .iub-toggle-checkbox input::-ms-check{visibility:hidden}#iubenda-iframe .iub-toggle-checkbox input.style1{width:64px!important;height:32px!important;border-radius:32px!important;transition:background-position .4s ease,background-color .4s ease!important;background-color:#ccc!important;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E%3Cpath fill='%23FFF' fill-rule='evenodd' d='M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zM5.729 5.033a.5.5 0 0 0-.638.058l-.058.07a.5.5 0 0 0 .058.637l3.201 3.201-3.201 3.203a.5.5 0 0 0 .707.707l3.201-3.203 3.203 3.203.07.058a.5.5 0 0 0 .637-.058l.058-.07a.5.5 0 0 0-.058-.637L9.706 8.999l3.203-3.201a.5.5 0 0 0-.707-.707L8.999 8.292 5.798 5.091z'/%3E%3C/svg%3E\")!important;background-repeat:no-repeat!important;background-position:top 4px left 4px!important;background-size:24px 24px!important}#iubenda-iframe .iub-toggle-checkbox input.style1:checked{background-color:#1cc691!important;background-position:top 4px left 36px!important;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E%3Cpath fill='%23FFF' fill-rule='evenodd' d='M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zm4.646 5.646l-6.198 6.2-3.1-3a.5.5 0 1 0-.696.718l3.454 3.342a.5.5 0 0 0 .701-.006l6.547-6.546a.5.5 0 1 0-.708-.708z'/%3E%3C/svg%3E\")!important}#iubenda-iframe .iub-toggle-checkbox input.style1:checked.sm{background-position:top 3px left 27px!important}#iubenda-iframe .iub-toggle-checkbox input.style1:checked.half{background-color:#ffd24d!important;background-position:top 4px left 20px!important;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E%3Cpath fill='%23FFF' fill-rule='evenodd' d='M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zm4 8.5H5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1z'/%3E%3C/svg%3E\")!important}#iubenda-iframe .iub-toggle-checkbox input.style1:checked.half.sm{background-position:top 3px left 15px!important}#iubenda-iframe .iub-toggle-checkbox input.style1.sm{width:48px!important;height:24px!important;border-radius:24px!important;background-size:18px 18px!important;background-position:top 3px left 3px!important}#iubenda-iframe .iub-toggle-checkbox input::-ms-check{visibility:hidden!important}#iubenda-iframe .iub-toggle-checkbox input:not([disabled]){cursor:pointer!important}#iubenda-iframe .iub-toggle-checkbox input[disabled]{opacity:.35}#iubenda-iframe .iub-toggle-checkbox .iub-caption{display:none!important}#iubenda-iframe .iub-consent-buttons{position:-webkit-sticky!important;position:sticky!important;top:0!important;background-color:#fff!important;box-shadow:0 1px rgba(0,0,0,.07)!important;z-index:3!important;padding:24px 16px!important;display:flex!important;justify-content:flex-end!important;align-items:center!important}@media (max-width:799px){#iubenda-iframe .iub-consent-buttons{padding:16px 12px!important}}@media (max-width:799px){#iubenda-iframe .iub-consent-buttons{justify-content:center!important}#iubenda-iframe .iub-consent-buttons>div{display:flex!important;flex:1!important}#iubenda-iframe .iub-consent-buttons>div button{flex:1!important}}#iubenda-iframe .iub-btn{font-size:14px!important;font-weight:700!important;display:inline-flex;justify-content:center!important;align-items:center!important;padding:8px 16px!important;color:#404040!important;background-color:rgba(0,0,0,.07)!important;border-radius:6px!important;text-decoration:none!important;background-size:21px!important;background-position:center left 10px!important;background-repeat:no-repeat!important;cursor:pointer!important;border:1px solid transparent!important}#iubenda-iframe .iub-btn:hover{background-color:transparent!important;border-color:currentColor!important}#iubenda-iframe .iub-btn svg{margin-right:4px!important;width:20px!important;height:20px!important}#iubenda-iframe .iub-btn.iub-btn-cp{max-width:100%!important}#iubenda-iframe .iub-btn.iub-btn-cp span{white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}#iubenda-iframe .iub-btn.iub-btn-back{padding:8px!important}#iubenda-iframe .iub-btn.iub-btn-back svg{margin:0!important}#iubenda-iframe .iub-btn-config{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='none' fill-rule='evenodd' stroke='%23535353' d='M9.803 2.5v.77h0c.499.199.958.478 1.363.822l.642-.364a.5.5 0 0 1 .686.197l1.273 2.35a.5.5 0 0 1-.193.673l-.659.373h0a5.244 5.244 0 0 1 0 1.358l.659.373a.5.5 0 0 1 .193.673l-1.273 2.35a.5.5 0 0 1-.686.197l-.642-.364h0a4.932 4.932 0 0 1-1.362.823v.769a.5.5 0 0 1-.5.5H6.696a.5.5 0 0 1-.5-.5l-.001-.77h0a4.932 4.932 0 0 1-1.362-.822l-.642.364a.5.5 0 0 1-.686-.197l-1.273-2.35a.5.5 0 0 1 .193-.673l.659-.373h0a5.244 5.244 0 0 1 0-1.359l-.658-.372a.5.5 0 0 1-.193-.674l1.272-2.349a.5.5 0 0 1 .686-.197l.642.364h0a4.932 4.932 0 0 1 1.362-.823V2.5a.5.5 0 0 1 .5-.5h2.607a.5.5 0 0 1 .5.5zM8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'/%3E%3C/svg%3E\")!important;padding-left:40px!important}#iubenda-iframe .iub-btn-primary{background-color:#0073ce!important;color:#fff!important}#iubenda-iframe .iub-btn-stroked{background-color:transparent!important;border:1px solid rgba(0,0,0,.25)!important}#iubenda-iframe .iub-btn-stroked:hover{background-color:transparent!important;border-color:rgba(0,0,0,.65)!important}@media (max-width:799px){#iubenda-iframe .iub-btn.iub-desktop{display:none!important}}@media (min-width:800px){#iubenda-iframe .iub-btn.iub-mobile{display:none!important}}#iubenda-iframe .iub-btn-consent{margin:0 4px!important;border-radius:32px!important;box-shadow:0 4px 8px -6px rgba(0,0,0,.2)!important;padding:8px 20px!important;background-color:#ededed!important;text-align:center!important;color:#3c3c3c!important;background-repeat:no-repeat!important;background-position:center left 16px!important;padding-left:38px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;position:relative!important}#iubenda-iframe .iub-btn-consent:active{box-shadow:0 2px 4px -6px rgba(0,0,0,.5)!important;top:1px!important}#iubenda-iframe .iub-btn-consent.iub-btn-accept{color:#06281f!important;background-image:url(\"data:image/svg+xml,%3C%3Fxml version='1.0'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 515.556 515.556' height='512px' viewBox='0 0 515.556 515.556' width='512px' class=''%3E%3Cg%3E%3Cpath d='m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z' data-original='%23000000' class='active-path' data-old_color='%23000000' fill='%2306281F'/%3E%3C/g%3E%3C/svg%3E%0A\")!important;background-size:16px!important}#iubenda-iframe .iub-btn-consent.iub-btn-reject{background-image:url(\"data:image/svg+xml,%3C%3Fxml version='1.0'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 386.667 386.667' height='512px' viewBox='0 0 386.667 386.667' width='512px' class=''%3E%3Cg%3E%3Cpath d='m386.667 45.564-45.564-45.564-147.77 147.769-147.769-147.769-45.564 45.564 147.769 147.769-147.769 147.77 45.564 45.564 147.769-147.769 147.769 147.769 45.564-45.564-147.768-147.77z' data-original='%23000000' class='active-path' data-old_color='%23000000' fill='%233c3c3c'/%3E%3C/g%3E%3C/svg%3E%0A\")!important;background-size:14px!important}#iubenda-iframe .iub-btn-consent:focus{background-color:#fff!important}@media (max-width:799px){#iubenda-iframe .iub-btn-consent{padding:8px 10px!important;padding-left:32px!important;background-position:center left 12px!important;margin:0 4px!important}}#iubenda-iframe{background-color:rgba(0,0,0,.8)!important;transition:opacity .4s ease,visibility .4s ease!important;font-size:16px!important;position:fixed!important;z-index:100000000!important;top:0!important;left:0!important;width:100%!important;height:100%!important;border:0!important;margin:0!important;padding:0!important;line-height:1.5!important;align-items:unset!important;align-content:unset!important;flex-wrap:unset!important;align-items:center!important;justify-content:center!important;display:none!important}#iubenda-iframe *{align-items:unset!important;align-content:unset!important;flex-wrap:unset!important;font-size:100%!important;width:auto!important;-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;background:0 0!important;box-sizing:border-box!important;-webkit-tap-highlight-color:transparent!important;-webkit-backface-visibility:hidden!important;backface-visibility:hidden!important;font-family:-apple-system,sans-serif!important;text-decoration:none!important;color:currentColor!important;background-attachment:scroll!important;background-color:transparent!important;background-image:none!important;background-position:0 0!important;background-repeat:repeat!important;border:0!important;border-color:#000!important;border-color:currentColor!important;border-radius:0!important;border-style:none!important;border-width:medium!important;bottom:auto!important;clear:none!important;clip:auto!important;counter-increment:none!important;counter-reset:none!important;direction:inherit!important;float:none!important;font-style:inherit!important;font-variant:normal!important;font-weight:inherit!important;height:auto!important;left:auto!important;letter-spacing:normal!important;line-height:inherit!important;list-style-type:inherit!important;list-style-position:outside!important;list-style-image:none!important;margin:0!important;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:1;overflow:visible!important;padding:0!important;position:static!important;quotes:\"\" \"\"!important;right:auto!important;table-layout:auto!important;text-align:left!important;text-indent:0!important;text-transform:none!important;top:auto!important;unicode-bidi:normal!important;vertical-align:baseline!important;visibility:inherit!important;white-space:normal!important;width:auto!important;word-spacing:normal!important;z-index:auto!important;background-origin:padding-box!important;background-origin:padding-box!important;background-clip:border-box!important;background-size:auto!important;-o-border-image:none!important;border-image:none!important;border-radius:0!important;border-radius:0!important;box-shadow:none!important;-moz-column-count:auto!important;column-count:auto!important;-moz-column-gap:normal!important;column-gap:normal!important;-moz-column-rule:medium none #000!important;column-rule:medium none #000!important;-moz-column-span:none!important;column-span:none!important;-moz-column-width:auto!important;column-width:auto!important;font-feature-settings:normal!important;overflow-x:visible!important;overflow-y:visible!important;-webkit-hyphens:manual!important;hyphens:manual!important;perspective:none!important;perspective-origin:50% 50%!important;text-shadow:none!important;transition:all 0s ease 0s!important;transform:none!important;transform-origin:50% 50%!important;transform-style:flat!important;word-break:normal!important;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}#iubenda-iframe.iubenda-iframe-visible{display:flex!important}#iubenda-iframe input[type=checkbox]:before{display:none!important}#iubenda-iframe .iub-popover-trigger{display:inline-block!important;text-decoration:underline!important;-webkit-text-decoration-style:dashed!important;text-decoration-style:dashed!important;position:relative!important;margin-right:16px!important;cursor:pointer!important;line-height:1.25!important;font-weight:inherit!important;color:inherit!important}#iubenda-iframe .iub-popover-trigger:after,#iubenda-iframe .iub-popover-trigger:before{content:\"\";display:inline-block;width:14px;height:14px;border-radius:12px;vertical-align:middle;background-size:4px;position:absolute;left:calc(100% + 2px);top:3px}#iubenda-iframe .iub-popover-trigger:before{background-color:currentColor;opacity:.35}#iubenda-iframe .iub-popover-trigger:after{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='13' viewBox='0 0 7 13'%3E%3Cg fill='%23FFF' fill-rule='evenodd'%3E%3Cpath d='M2.779 1.288a1.287 1.287 0 112.574 0 1.287 1.287 0 01-2.574 0zM5.467 10.422l.903 1.851-.7.341a2.496 2.496 0 01-3.545-2.717l.818-3.252a.42.42 0 00-.178-.382.422.422 0 00-.452-.041l-.844.412-.902-1.852.843-.412a2.491 2.491 0 012.576.233 2.49 2.49 0 01.989 2.389 1.105 1.105 0 01-.02.095l-.817 3.253a.42.42 0 00.178.382c.08.059.244.142.451.041l.7-.341z'/%3E%3C/g%3E%3C/svg%3E\");background-position:center;background-repeat:no-repeat}#iubenda-iframe .iub-popover{position:absolute!important;top:24px!important;bottom:0!important;left:0!important;right:0!important;border-radius:4px!important;background-color:#fff!important;color:#222!important;z-index:2!important;box-shadow:0 0 32px rgba(0,0,0,.1)!important;opacity:0!important;visibility:hidden!important;transform:translateY(24px)!important;transition:opacity .3s ease,visibility .3s ease,transform .3s ease!important;display:flex!important;flex-direction:column!important;z-index:99!important;pointer-events:none!important;overflow:hidden!important}#iubenda-iframe .iub-popover-header{flex-shrink:0!important;display:flex!important;justify-content:space-between!important;z-index:1!important;box-shadow:0 16px 16px #fff!important}#iubenda-iframe .iub-popover-header>*{padding:24px!important;padding-bottom:0!important}#iubenda-iframe .iub-popover-header-title{font-size:18px!important;font-weight:700!important}#iubenda-iframe .iub-popover-header-close{font-size:24px!important;font-weight:300!important;cursor:pointer!important;line-height:1!important;position:relative!important;top:-2px!important}#iubenda-iframe .iub-popover-content{font-size:14px!important;flex:1!important;font-weight:300!important;line-height:1.5!important;position:relative!important}#iubenda-iframe .iub-popover-content>div{padding:0 24px!important;overflow-y:auto!important;height:100%!important}#iubenda-iframe .iub-popover-content>div:after,#iubenda-iframe .iub-popover-content>div:before{content:\"\";display:block;height:24px}#iubenda-iframe .iub-popover-content>div .storage-info-field:not(:last-of-type){margin-bottom:0!important}#iubenda-iframe .iub-popover-content>div .storage-info-field>.storage-info-field-title{font-weight:700!important}#iubenda-iframe .iub-popover-content h3{margin-bottom:16px!important;font-weight:700!important}#iubenda-iframe .iub-popover-content p:not(:last-of-type){margin-bottom:16px!important}#iubenda-iframe .iub-popover-content a{text-decoration:underline!important;cursor:pointer!important;opacity:.8!important}#iubenda-iframe .iub-popover-content b,#iubenda-iframe .iub-popover-content strong{font-weight:700!important}#iubenda-iframe .iub-popover-content em,#iubenda-iframe .iub-popover-content i{font-style:italic!important}#iubenda-iframe .iub-popover-content:after{position:absolute;content:\"\";display:block;height:24px;pointer-events:none;left:0;right:0;bottom:0;background:linear-gradient(180deg,rgba(255,255,255,0) 0,#fff 100%)}#iubenda-iframe .iub-popover{top:25%!important}#iubenda-iframe.iub-popover-visible .iub-popover{opacity:1!important;visibility:visible!important;transform:translateY(0)!important;pointer-events:auto!important}#iubenda-iframe.iub-popover-visible #iubenda-iframe-popup:before{opacity:1;visibility:visible;pointer-events:auto}@-webkit-keyframes iubenda-iframe-spinner{from{transform:rotate(0)}to{transform:rotate(359deg)}}@keyframes iubenda-iframe-spinner{from{transform:rotate(0)}to{transform:rotate(359deg)}}#iubenda-iframe .iubenda-iframe-spinner{position:absolute!important;top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important}#iubenda-iframe .iubenda-iframe-spinner:after{content:\"\"!important;border:solid 2px transparent!important;border-top-color:currentColor!important;border-left-color:currentColor!important;-webkit-animation:iubenda-iframe-spinner .8s linear infinite!important;animation:iubenda-iframe-spinner .8s linear infinite!important;width:48px!important;height:48px!important;border-radius:48px!important;display:inline-block!important;vertical-align:middle!important;color:#fff!important}#iubenda-iframe #iubenda-iframe-popup.iubenda-showing-popup .iubenda-iframe-spinner:after,#iubenda-iframe #iubenda-iframe-popup.iubenda-showing-popup~.iubenda-iframe-spinner:after{color:#000!important}#iubenda-iframe .iub-legitimate-interest-checkbox{padding:16px!important;border-radius:4px!important;background-color:rgba(0,0,0,.02)!important;display:flex!important;justify-content:space-between!important;align-items:center!important;margin-top:10px!important}#iubenda-iframe .iub-legitimate-interest-checkbox label{margin-right:8px!important;flex:1!important;font-weight:400!important}#iubenda-iframe .iub-legitimate-interest-checkbox input[type=checkbox]{-moz-appearance:none!important;appearance:none!important;-webkit-appearance:none!important;border:0!important;margin:0!important;width:24px!important;height:24px!important;border-radius:4px!important;box-shadow:inset 0 0 0 2px rgba(0,0,0,.35)!important;background-color:#fff!important;flex-shrink:0!important;cursor:pointer!important}#iubenda-iframe .iub-legitimate-interest-checkbox input[type=checkbox]:checked{box-shadow:none!important;background-color:#1cc691!important;background-image:url(\"data:image/svg+xml,%3C%3Fxml version='1.0'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' id='Capa_1' enable-background='new 0 0 515.556 515.556' height='512px' viewBox='0 0 515.556 515.556' width='512px' class=''%3E%3Cg%3E%3Cpath d='m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z' data-original='%23000000' class='active-path' data-old_color='%23000000' fill='%23FFFFFF'/%3E%3C/g%3E%3C/svg%3E%0A\")!important;background-position:center!important;background-repeat:no-repeat!important;background-size:14px!important}#iubenda-iframe #iubenda-iframe-popup{position:relative!important;width:800px!important;height:650px!important;box-shadow:0 0 16px rgba(0,0,0,.02)!important;border-radius:4px!important;overflow:hidden!important}#iubenda-iframe #iubenda-iframe-popup:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);z-index:98;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .3s ease,visibility .3s ease}@media (max-height:649px){#iubenda-iframe #iubenda-iframe-popup{height:calc(100% - 32px)!important}}@media (max-width:799px){#iubenda-iframe #iubenda-iframe-popup{width:calc(100% - 32px)!important}}#iubenda-iframe .iubenda-iframe-close-btn{cursor:pointer!important;width:24px!important;height:24px!important;border-radius:24px!important;display:flex!important;justify-content:center!important;align-items:center!important;font-weight:300!important;background-color:#fff!important;position:absolute!important;top:0!important;right:0!important;transform:translate(50%,-50%)!important;transition:transform .4s ease!important;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21'%3E%3Cpath fill='%23000' fill-rule='nonzero' d='M18.5.379L20.621 2.5l-8 8 8 8-2.121 2.121-8-8-8 8L.379 18.5l8-8-8-8L2.5.379l8 8z'/%3E%3C/svg%3E\")!important;background-size:8px 8px!important;background-repeat:no-repeat!important;background-position:center!important;box-shadow:0 0 32px rgba(0,0,0,.3)!important}#iubenda-iframe .iubenda-iframe-close-btn:hover{transform:translate(50%,-50%) scale(1.15)!important}@media (max-width:799px){#iubenda-iframe .iubenda-iframe-close-btn{width:36px!important;height:36px!important;border-radius:36px!important;transform:translate(25%,-25%)!important;transition:none!important}#iubenda-iframe .iubenda-iframe-close-btn:hover{transform:translate(25%,-25%)!important}}#iubenda-iframe iframe{width:100%!important;height:100%!important}#iubenda-iframe #iubenda-iframe-content{height:100%!important;display:flex!important;flex-direction:column!important}#iubenda-iframe .iubenda-modal-navigation{position:relative!important;z-index:3!important}#iubenda-iframe .iubenda-modal-navigation:not(.iubenda-modal-navigation-brand){color:#555!important;box-shadow:0 18px 10px -8px #fff!important}@media (max-width:799px){#iubenda-iframe .iubenda-modal-navigation:not(.iubenda-modal-navigation-brand){box-shadow:0 28px 12px -8px #fff!important}}#iubenda-iframe .iubenda-modal-navigation.iubenda-modal-navigation-brand{position:relative;box-shadow:0 1px 0 rgba(0,0,0,.075)!important}#iubenda-iframe .iubenda-modal-navigation.iubenda-modal-navigation-brand .iubenda-modal-navigation-logo{display:flex;flex-shrink:0!important;flex:1!important;margin-right:16px!important}#iubenda-iframe .iubenda-modal-navigation.iubenda-modal-navigation-brand .iubenda-modal-navigation-logo img{max-width:192px!important;max-height:56px!important;min-width:auto!important;min-height:auto!important}@media (max-width:799px){#iubenda-iframe .iubenda-modal-navigation.iubenda-modal-navigation-brand .iubenda-modal-navigation-logo img{max-width:75%!important}}#iubenda-iframe .iubenda-modal-navigation.iubenda-modal-navigation-brand .purposes-header{align-items:center!important}#iubenda-iframe .iubenda-iframe-top-container{flex:1!important;background-color:#fff!important;overflow:hidden!important}#iubenda-iframe .iubenda-iframe-footer{background-color:#fff!important;color:#555!important;font-size:16px!important;position:relative!important;z-index:10!important;box-shadow:0 -18px 10px -8px #fff!important;border-bottom-left-radius:4px!important;border-bottom-right-radius:4px!important}#iubenda-iframe .iubenda-iframe-footer .iub-btn-back{padding:8px 16px!important}#iubenda-iframe .iubenda-iframe-footer:not(.iubenda-iframe-footer-absolute):before{content:\"\";height:48px;display:block;width:100%;flex:0 0 100%;background:linear-gradient(to bottom,rgba(255,255,255,0) 0,#fff 100%);position:absolute;bottom:100%;pointer-events:none}@media (min-width:800px){#iubenda-iframe .iubenda-iframe-footer:not(.iubenda-iframe-footer-absolute)>*{margin-top:8px!important}}#iubenda-iframe .iubenda-iframe-footer.iubenda-iframe-footer-absolute{pointer-events:none!important}#iubenda-iframe .iubenda-iframe-footer.iubenda-iframe-footer-absolute>*{pointer-events:auto!important}@media (min-width:800px){#iubenda-iframe .iubenda-iframe-footer{display:flex;align-items:center!important;justify-content:space-between!important}#iubenda-iframe .iubenda-iframe-footer.iubenda-iframe-footer-absolute #iubFooterIabBtnContainer{opacity:0!important;pointer-events:none!important;transform:translateY(16px)!important}}@media (max-width:799px){#iubenda-iframe .iubenda-iframe-footer{text-align:center!important}#iubenda-iframe .iubenda-iframe-footer #iubFooterIabBtnContainer{position:absolute!important;bottom:6px!important;left:50%!important;transform:translateX(-50%)!important;margin:0!important;width:100%!important}#iubenda-iframe .iubenda-iframe-footer #iubFooterIabBtnContainer+#iubFooterBtnContainer{transform:translateY(-22px)!important}#iubenda-iframe .iubenda-iframe-footer.iubenda-iframe-footer-absolute{display:flex;flex-direction:column!important;padding:0!important;text-align:center!important}#iubenda-iframe .iubenda-iframe-footer.iubenda-iframe-footer-absolute #iubFooterBtnContainer,#iubenda-iframe .iubenda-iframe-footer.iubenda-iframe-footer-absolute #iubFooterIabBtnContainer{order:1}#iubenda-iframe .iubenda-iframe-footer.iubenda-iframe-footer-absolute #iubBackBtn{border:0!important;order:2;margin-top:0!important;padding-top:0!important;margin-top:-4px!important}#iubenda-iframe .iubenda-iframe-footer.iubenda-iframe-footer-absolute #iubFooterIabBtnContainer{opacity:0!important;pointer-events:none!important;transform:translate(-50%,16px)!important}#iubenda-iframe .iubenda-iframe-footer.iubenda-iframe-footer-absolute #iubFooterIabBtnContainer+#iubFooterBtnContainer{transform:translateY(0)!important}}#iubenda-iframe .iubenda-iframe-footer>*{transition:opacity .4s ease,transform .4s ease!important;margin:24px 20px!important}@media (max-width:799px){#iubenda-iframe .iubenda-iframe-footer>*{margin:16px 12px!important}}#iubenda-iframe #iubFooterBtnIab{-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;display:block!important;width:100%!important;font-size:12px!important;text-decoration:underline!important;color:currentColor!important;text-align:center!important;cursor:pointer!important}#iubenda-iframe #iubFooterBtnIab:hover{opacity:.6!important}#iubenda-iframe #iubFooterBtnContainer button{flex:1!important;-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;margin:4px!important;padding:8px 24px!important;border-radius:64px!important;cursor:pointer!important;font-weight:700!important;font-size:100%!important;background-color:#0073ce!important;color:#fff!important;border:1px solid transparent!important;text-align:center!important;border-color:transparent!important}#iubenda-iframe #iubFooterBtnContainer button:focus,#iubenda-iframe #iubFooterBtnContainer button:hover{box-shadow:0 0 0 999px inset rgba(0,0,0,.1)!important}@media (min-width:800px){#iubenda-iframe #iubFooterBtnContainer{align-self:end!important;margin-left:auto!important}}@media (max-width:799px){#iubenda-iframe #iubFooterBtnContainer{display:flex!important}#iubenda-iframe #iubFooterBtnContainer button{flex:1!important}}#iubenda-iframe .purposes-header-right{display:flex!important;position:relative!important;text-align:right!important;justify-content:flex-end!important;max-width:50%!important}#iubenda-iframe .purposes-header-right>*{flex-shrink:0!important}#iubenda-iframe .purposes-header-right .iub-iframe-brand-button{order:2!important}#iubenda-iframe .purposes-header-right .iub-iframe-brand-button.hover{width:154px!important}#iubenda-iframe .purposes-header-right .iub-iframe-brand-button.hover svg{margin-left:-30px!important}@media (max-width:799px){#iubenda-iframe .purposes-header-right .iub-iframe-brand-button.hover~.purposes-btn-cp{pointer-events:none!important;opacity:0!important}}#iubenda-iframe .iub-iframe-brand-button{width:42px!important;height:38px!important;margin-left:8px!important;margin-right:-24px!important;color:currentColor!important;display:inline-block!important;background-color:rgba(0,0,0,.075)!important;overflow:hidden!important;border-top-left-radius:32px!important;border-bottom-left-radius:32px!important;cursor:pointer!important;transition:transform .4s ease,width .4s ease!important}#iubenda-iframe .iub-iframe-brand-button svg{transition:margin .4s ease!important;height:38px!important;width:174px!important;margin-left:4px!important}@media (max-width:799px){#iubenda-iframe .iub-iframe-brand-button{margin-right:-16px!important}}#iubenda-iframe #iubenda-iframe-content.cookie-policy-no-logo #purposes-container .iubenda-modal-navigation-logo{display:none}#iubenda-iframe #iubenda-iframe-content.cookie-policy-no-logo .iubenda-iframe-footer #iubBackBtn{display:none!important}#iubenda-iframe #iubenda-iframe-content:not(.cookie-policy-no-logo) #purposes-container .purposes-btn-back{display:none}#iubenda-iframe #iubenda-iframe-content:not(.cookie-policy-no-logo) .iubenda-modal-navigation-brand .purposes-header>div{flex:1!important}#iubenda-iframe [tabindex]:not([tabindex=\"-1\"]):focus,#iubenda-iframe a[href]:focus,#iubenda-iframe button:focus,#iubenda-iframe details:focus,#iubenda-iframe input:focus,#iubenda-iframe select:focus,#iubenda-iframe textarea:focus{outline-width:2px!important;outline-style:solid!important;outline-color:#005fcc!important;outline-offset:2px!important}#iab-container .iab-top-container{padding:24px!important;font-size:16px!important;font-family:Helvetica,Helvetica Neue,Arial,sans-serif!important;background-color:#fff!important;border-radius:0!important;border-top-left-radius:5px!important;border-top-right-radius:5px!important;flex-shrink:0!important;display:flex!important;justify-content:space-between!important}#iab-container .iab-top-container button{font-size:14px!important;font-weight:700!important;color:rgba(0,0,0,.65)!important;display:inline-block!important;padding:8px 16px!important;background-color:rgba(0,0,0,.07)!important;border-radius:6px!important;text-decoration:none!important;background-size:21px!important;background-position:center left 10px!important;background-repeat:no-repeat!important;cursor:pointer!important}#iab-container .iab-top-container button:before{content:attr(data-str-desktop)}@media (max-width:799px){#iab-container .iab-top-container button:before{content:attr(data-str-mobile)}}#iab-container .iab-top-container button:hover{opacity:.8!important}#iab-container .iab-top-container button.cp-button{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23535353'%3E%3Cpath d='M3 2h5c1.773 0 5 2.634 5 5v7H3V2z'/%3E%3Cpath d='M13 7H8V2h0'/%3E%3C/g%3E%3C/svg%3E\")!important;padding-left:40px!important}#iab-container .iab-top-container button.back-button{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23535353' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6.72 12.243L2.477 8h0L6.72 3.757M3 8h10.548'/%3E%3C/g%3E%3C/svg%3E\")!important;padding-left:40px!important}#iab-container .iab-top-container button.stroked-button{background-color:transparent!important;border:1px solid rgba(0,0,0,.25)!important}#iab-container .iab-top-container button.stroked-button:hover{background-color:transparent!important;border-color:rgba(0,0,0,.45)!important}#purposes-container .purposes-header{padding:24px!important;position:relative!important;z-index:2!important;display:flex!important;justify-content:space-between!important;align-items:center!important}@media (max-width:799px){#purposes-container .purposes-header{padding:16px!important}}#iubenda-iframe.iubenda-iframe-branded .purposes-header .iub-btn{border-color:currentColor!important}#purposes-content-container{display:flex!important;flex-direction:column!important;line-height:1.5!important}#purposes-content-container a{color:rgba(0,0,0,.7)!important;text-decoration:underline!important}#purposes-content-container a.trigger-link{font-weight:700!important;background-color:#eaeaea!important;padding:8px 16px!important;color:rgba(0,0,0,.75)!important;border-radius:6px!important;display:inline-block!important;text-decoration:none!important;white-space:nowrap!important}#purposes-content-container button{position:relative!important}#purposes-content-container .purposes-content{flex:1!important;overflow-y:scroll!important}#purposes-content-container .purposes-header{flex-shrink:0!important;padding:24px!important}@media (max-width:799px){#purposes-content-container .purposes-header{padding:16px 16px 32px!important}}#purposes-content-container .purposes-header .purposes-header-title{font-weight:700!important;font-size:48px!important;margin-bottom:8px!important}@media (max-width:799px){#purposes-content-container .purposes-header .purposes-header-title{font-size:24px!important}}#purposes-content-container .purposes-header .purposes-header-text{font-size:15px!important;font-weight:300!important}#purposes-content-container .purposes-items{border-radius:4px!important;background-color:#fff!important}#purposes-content-container .purposes-badge{display:inline-block!important;padding:2px 16px!important;border-radius:32px!important;font-size:10px!important;font-weight:700!important;text-align:center!important;margin:6px 0!important}@media (max-width:799px){#purposes-content-container .purposes-badge{margin:6px 0!important}}#purposes-content-container .purposes-badge.purposes-badge-primary{color:#25a247!important;text-align:left!important;padding:0!important;display:flex!important;align-items:center!important}#purposes-content-container .purposes-badge.purposes-badge-primary:before{content:\"\";width:24px!important;height:24px!important;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='16' viewBox='0 0 14 16'%3E%3Cpath fill='%2325a247' fill-rule='evenodd' d='M6.592 0L0 2.783v6.611C0 12.502 6.222 15.902 6.588 16c.366-.098 6.588-3.735 6.588-6.258V2.783L6.592 0z'/%3E%3C/svg%3E\")!important;background-repeat:no-repeat!important;background-position:center!important;background-size:12px 12px!important;display:inline-block!important;background-color:#47c51e21!important;vertical-align:middle!important;border-radius:32px!important;margin-right:6px!important;border-top-left-radius:8px!important;flex-shrink:0}#purposes-content-container .purposes-first{box-shadow:0 1px 0 rgba(0,0,0,.1),inset 0 4px 0 rgba(0,0,0,.04),0 4px 4px rgba(0,0,0,.05)!important;position:sticky!important;position:-webkit-sticky!important;top:0!important;background-color:#f8f8f8!important;z-index:2!important;padding:16px 24px!important;display:flex!important;justify-content:space-between!important;align-items:center!important;display:none!important}#purposes-content-container .purposes-first>:first-child{text-transform:uppercase!important;text-align:right!important;font-weight:700!important;font-size:12px!important;letter-spacing:1.25px!important;color:rgba(0,0,0,.75)!important;flex:1}@media (max-width:799px){#purposes-content-container .purposes-first>:first-child{font-size:10px!important}}@media (max-width:799px){#purposes-content-container .purposes-first{padding:16px 16px!important}}#purposes-content-container .purposes-item{position:relative!important;display:flex!important;flex-direction:column!important;margin:0 24px!important}@media (max-width:799px){#purposes-content-container .purposes-item{margin:0 20px!important}}#purposes-content-container .purposes-item:not(:last-of-type){border-bottom:1px solid rgba(0,0,0,.075)!important}#purposes-content-container .purposes-item.purposes-item-shown .purposes-item-body{max-height:1000px!important;padding:0 0 24px!important}@media (max-width:799px){#purposes-content-container .purposes-item.purposes-item-shown .purposes-item-body{padding:0 0 16px!important}}#purposes-content-container .purposes-item.purposes-item-shown .purposes-item-title-btn:after{transform:rotate(180deg)!important}#purposes-content-container .purposes-item .purposes-item-header{background:linear-gradient(0deg,rgba(255,255,255,0) 0,#fff 15%)!important;position:sticky!important;position:-webkit-sticky!important;top:85px!important;z-index:1!important;display:flex!important;padding:24px 0!important}@media (max-width:799px){#purposes-content-container .purposes-item .purposes-item-header{top:65px!important}}#purposes-content-container .purposes-item .purposes-item-title{display:flex!important;flex:1!important;justify-content:space-between!important}#purposes-content-container .purposes-item .purposes-item-title>div:first-of-type{display:flex!important}@media (min-width:800px){#purposes-content-container .purposes-item .purposes-item-title>div:first-of-type{align-items:center!important}}@media (max-width:799px){#purposes-content-container .purposes-item .purposes-item-title>div:first-of-type{flex-direction:column!important}}@media (max-width:799px){#purposes-content-container .purposes-item .purposes-item-title{flex-direction:column!important}}#purposes-content-container .purposes-item .purposes-item-title label{font-weight:700!important;font-size:16px!important}@media (max-width:799px){#purposes-content-container .purposes-item .purposes-item-title label{font-size:14px!important}}#purposes-content-container .purposes-item .purposes-item-title .purposes-item-title-btn{-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;font-size:12px!important;color:rgba(0,0,0,.75)!important;font-weight:300!important;display:flex!important;align-items:center!important;cursor:pointer!important}#purposes-content-container .purposes-item .purposes-item-title .purposes-item-title-btn:after{content:\"\";width:10px!important;height:10px!important;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='5' viewBox='0 0 10 5'%3E%3Cpath fill='none' fill-rule='evenodd' stroke='%23979797' stroke-linecap='round' stroke-linejoin='round' d='M9.243 0L5 4.243h0L.757 0'/%3E%3C/svg%3E\")!important;opacity:.5!important;background-position:center!important;background-repeat:no-repeat!important;display:inline-block!important;margin:8px 6px!important}#purposes-content-container .purposes-item .purposes-item-body{max-height:0!important;overflow:hidden!important;transition:max-height .4s ease,padding .4s ease!important;font-size:14px!important;font-weight:300!important;color:rgba(0,0,0,.75)!important}@media (max-width:799px){#purposes-content-container .purposes-item .purposes-item-body{font-size:12px!important}}#purposes-content-container .purposes-item .purposes-item-body p:not(:last-of-type){margin-bottom:8px!important}#purposes-content-container .purposes-sub-container{color:#5f5f5f!important}#purposes-content-container .purposes-sub-container:not(:last-of-type){padding-bottom:32px!important}#purposes-content-container .purposes-sub-container>div:first-of-type{display:flex;align-items:center;margin-bottom:8px!important}#purposes-content-container .purposes-sub-container>div:first-of-type>div:first-of-type{flex:1}#purposes-content-container .purposes-sub-container label{font-weight:700!important}#purposes-content-container .purposes-sub-container p:not(:last-of-type){margin-bottom:16px!important}", e), ct = !0
            }
        },
        dt = function() {
            if (!pt) {
                var e = document.getElementsByTagName("head")[0];
                de('#iubenda-cs-banner{font-size:15px!important;background:0 0!important;line-height:1.4!important;position:fixed!important;z-index:99999998!important;top:0!important;left:0!important;width:100%!important;height:100%!important;border:0!important;margin:0!important;padding:0!important;overflow:hidden!important;display:flex!important;will-change:opacity;opacity:0!important;pointer-events:none!important;transition:opacity .4s ease!important}#iubenda-cs-banner .iubenda-banner-content:not(.iubenda-custom-content) *,#iubenda-cs-banner [class*=" iub"],#iubenda-cs-banner [class^=iub]{font-size:100%!important;width:auto!important;-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;background:0 0!important;box-sizing:border-box!important;-webkit-tap-highlight-color:transparent!important;font-family:-apple-system,sans-serif!important;text-decoration:none!important;color:currentColor!important;background-attachment:scroll!important;background-color:transparent!important;background-image:none!important;background-position:0 0!important;background-repeat:repeat!important;border:0!important;border-color:#000!important;border-color:currentColor!important;border-radius:0!important;border-style:none!important;border-width:medium!important;bottom:auto!important;clear:none!important;clip:auto!important;counter-increment:none!important;counter-reset:none!important;direction:inherit!important;float:none!important;font-style:inherit!important;font-variant:normal!important;font-weight:inherit!important;height:auto!important;left:auto!important;letter-spacing:normal!important;line-height:inherit!important;list-style-type:inherit!important;list-style-position:outside!important;list-style-image:none!important;margin:0!important;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:1;overflow:visible!important;padding:0!important;position:static!important;quotes:"" ""!important;right:auto!important;table-layout:auto!important;text-align:left!important;text-indent:0!important;text-transform:none!important;top:auto!important;unicode-bidi:normal!important;vertical-align:baseline!important;white-space:normal!important;width:auto!important;word-spacing:normal!important;z-index:auto!important;background-origin:padding-box!important;background-origin:padding-box!important;background-clip:border-box!important;background-size:auto!important;-o-border-image:none!important;border-image:none!important;border-radius:0!important;border-radius:0!important;box-shadow:none!important;-moz-column-count:auto!important;column-count:auto!important;-moz-column-gap:normal!important;column-gap:normal!important;-moz-column-rule:medium none #000!important;column-rule:medium none #000!important;-moz-column-span:none!important;column-span:none!important;-moz-column-width:auto!important;column-width:auto!important;font-feature-settings:normal!important;overflow-x:visible!important;overflow-y:visible!important;-webkit-hyphens:manual!important;hyphens:manual!important;perspective:none!important;perspective-origin:50% 50%!important;text-shadow:none!important;transition:all 0s ease 0s!important;transform:none!important;transform-origin:50% 50%!important;transform-style:flat!important;word-break:normal!important;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}#iubenda-cs-banner.iubenda-cs-overlay:before{content:""!important;position:fixed!important;top:0!important;left:0!important;width:100%!important;height:100%!important;background-color:rgba(0,0,0,.5)!important;z-index:1!important;pointer-events:auto!important}#iubenda-cs-banner.iubenda-cs-center{align-items:center!important;justify-content:center!important}#iubenda-cs-banner.iubenda-cs-top{align-items:flex-start!important}#iubenda-cs-banner.iubenda-cs-bottom{align-items:flex-end!important}#iubenda-cs-banner.iubenda-cs-left{justify-content:flex-start!important}#iubenda-cs-banner.iubenda-cs-right{justify-content:flex-end!important}#iubenda-cs-banner.iubenda-cs-visible{opacity:1!important}#iubenda-cs-banner.iubenda-cs-visible>*{pointer-events:auto!important}#iubenda-cs-banner.iubenda-cs-slidein .iubenda-cs-container{transition:transform .4s ease!important}#iubenda-cs-banner.iubenda-cs-slidein.iubenda-cs-top .iubenda-cs-container{transform:translateY(-48px)!important}#iubenda-cs-banner.iubenda-cs-slidein.iubenda-cs-bottom .iubenda-cs-container{transform:translateY(48px)!important}#iubenda-cs-banner.iubenda-cs-slidein.iubenda-cs-visible .iubenda-cs-container{transform:translateY(0)!important}#iubenda-cs-banner .iubenda-cs-container{position:relative!important;z-index:2!important}#iubenda-cs-banner .iubenda-cs-brand{display:flex!important;padding:16px!important;flex-shrink:0!important}#iubenda-cs-banner .iubenda-cs-brand>div{display:flex!important;justify-content:flex-start!important}#iubenda-cs-banner .iubenda-cs-brand img{max-width:192px!important;max-height:32px!important}#iubenda-cs-banner .iubenda-cs-content{position:relative!important;z-index:1!important;overflow:hidden!important;transition:transform .4s ease!important;background-color:#000!important;color:#fff!important;font-size:14px!important;display:flex;flex-direction:column}#iubenda-cs-banner .iubenda-cs-rationale{position:relative!important;display:flex!important;flex-direction:column!important;flex:1 1 auto}#iubenda-cs-banner .iubenda-cs-close-btn{z-index:1!important;top:6px!important;right:0!important;margin:10px!important;min-width:32px!important;height:32px!important;padding:6px!important;font-size:24px!important;line-height:0!important;font-weight:lighter!important;cursor:pointer!important;text-align:center!important;border:1px solid transparent!important;border-radius:4px!important;opacity:.7!important;align-self:flex-end!important}#iubenda-cs-banner .iubenda-cs-close-btn:hover{opacity:1!important}#iubenda-cs-banner .iubenda-banner-content{font-weight:300!important;padding:16px!important;flex:1 1 auto!important;overflow-y:auto!important}#iubenda-cs-banner .iubenda-banner-content a{cursor:pointer!important;color:currentColor!important;opacity:.7!important;text-decoration:underline!important}#iubenda-cs-banner .iubenda-banner-content a:hover{opacity:1!important}#iubenda-cs-banner #iubenda-cs-title{margin-bottom:16px!important;margin-top:8px!important;font-weight:700!important}#iubenda-cs-banner .iubenda-cs-counter{text-align:center!important;position:relative!important;z-index:1!important;display:none;pointer-events:none;flex-shrink:0;padding:8px!important;font-size:13px!important;font-weight:700!important}#iubenda-cs-banner .iubenda-cs-cwa-button{font-weight:700!important;font-size:13px!important;background:rgba(255,255,255,.1)!important;color:#fff!important;padding:8px 14px!important;flex-shrink:0;border-radius:4px!important;text-align:center!important;z-index:1!important;margin:16px!important;margin-bottom:0!important;cursor:pointer!important}#iubenda-cs-banner .iubenda-cs-cwa-button:focus,#iubenda-cs-banner .iubenda-cs-cwa-button:hover{box-shadow:0 0 0 999px inset rgba(0,0,0,.1)!important}@media (max-width:639px){#iubenda-cs-banner .iubenda-cs-cwa-button{box-shadow:0 8px 16px 4px rgba(0,0,0,.2)!important}}@media (min-width:640px){#iubenda-cs-banner .iubenda-cs-cwa-button{align-self:flex-end}}#iubenda-cs-banner .iubenda-cs-opt-group{z-index:1!important;display:flex!important;margin-top:0!important;flex-shrink:0!important;color:#000!important;margin:16px!important;margin-top:0!important}#iubenda-cs-banner .iubenda-cs-opt-group>div{display:flex!important}@media (min-width:640px){#iubenda-cs-banner .iubenda-cs-opt-group{align-items:center!important;justify-content:space-between!important}#iubenda-cs-banner .iubenda-cs-opt-group-custom{margin-right:auto!important;align-self:start!important;justify-content:flex-start!important}#iubenda-cs-banner .iubenda-cs-opt-group-consent{margin-left:auto!important;align-self:end!important;justify-content:flex-end!important}}@media (max-width:639px){#iubenda-cs-banner .iubenda-cs-opt-group{flex-direction:column!important}#iubenda-cs-banner .iubenda-cs-opt-group-custom{order:2}#iubenda-cs-banner .iubenda-cs-opt-group-consent{order:1}}#iubenda-cs-banner .iubenda-cs-opt-group button{-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;padding:8px 32px!important;border-radius:64px!important;cursor:pointer!important;font-weight:700!important;font-size:100%!important;margin-top:4px!important;margin-bottom:4px!important;text-align:center!important;border:0!important;background-color:#1a1a1a!important;color:#fff!important}#iubenda-cs-banner .iubenda-cs-opt-group button.focus,#iubenda-cs-banner .iubenda-cs-opt-group button.hover{box-shadow:0 0 0 999px inset rgba(0,0,0,.1)!important}@media (min-width:640px){#iubenda-cs-banner .iubenda-cs-opt-group button:not(:last-of-type){margin-right:8px!important}}@media (max-width:639px){#iubenda-cs-banner .iubenda-cs-opt-group button{padding:8px 24px!important;width:100%!important;display:block;text-align:center!important;margin:6px 3px!important;flex:1}}#iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-accept-btn,#iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-btn-primary{background-color:#0073ce!important;color:#fff!important}#iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-reject-btn{background-color:#0073ce!important;color:#fff!important}#iubenda-cs-banner.iubenda-cs-padded:not(.iubenda-cs-branded) .iubenda-banner-content{padding-right:48px!important}#iubenda-cs-banner.iubenda-cs-padded .iubenda-cs-close-btn{position:absolute!important}@media (min-width:640px){#iubenda-cs-banner:not(.iubenda-cs-padded).iubenda-cs-branded .iubenda-cs-cwa-button{position:absolute!important}}@media (min-width:640px){#iubenda-cs-banner:not(.iubenda-cs-branded):not(.iubenda-cs-no-heading) .iubenda-cs-cwa-button{position:absolute!important;top:-4px!important;right:-4px!important;padding:5px 10px!important}}@media (min-width:640px){#iubenda-cs-banner.iubenda-cs-branded:not(.iubenda-cs-default-floating).iubenda-cs-bottom .iubenda-cs-brand,#iubenda-cs-banner.iubenda-cs-branded:not(.iubenda-cs-default-floating).iubenda-cs-top .iubenda-cs-brand{border-radius:8px!important}}@media (min-width:640px){#iubenda-cs-banner.iubenda-cs-branded .iubenda-cs-cwa-button{margin:15px!important}}#iubenda-cs-banner.iubenda-cs-branded .iubenda-cs-close-btn{height:32px!important;min-width:32px!important}#iubenda-cs-banner.iubenda-cs-default .iubenda-cs-brand{margin:0 -8px 0!important}@media (max-width:991px){#iubenda-cs-banner.iubenda-cs-default .iubenda-cs-brand{margin:-8px -8px 0!important}}@media (min-width:992px){#iubenda-cs-banner.iubenda-cs-default .iubenda-cs-brand div{margin:0 auto!important;width:calc(992px - 32px)!important}}@media (max-width:991px){#iubenda-cs-banner.iubenda-cs-default .iubenda-cs-brand div{margin:0 8px!important}}#iubenda-cs-banner.iubenda-cs-default .iubenda-cs-container{width:100%!important}@media (min-width:992px){#iubenda-cs-banner.iubenda-cs-default .iubenda-cs-rationale{width:992px!important;margin:16px auto!important}}@media (min-width:992px){#iubenda-cs-banner.iubenda-cs-default-floating .iubenda-cs-container{width:992px!important}}@media (max-width:991px){#iubenda-cs-banner.iubenda-cs-default-floating.iubenda-cs-center.iubenda-cs-bottom .iubenda-cs-container,#iubenda-cs-banner.iubenda-cs-default-floating.iubenda-cs-center.iubenda-cs-top .iubenda-cs-container{width:100%!important}}@media (min-width:640px){#iubenda-cs-banner.iubenda-cs-default-floating.iubenda-cs-center:not(.iubenda-cs-top):not(.iubenda-cs-bottom) .iubenda-cs-container,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-bottom):not(.iubenda-cs-center) .iubenda-cs-container,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-top):not(.iubenda-cs-center) .iubenda-cs-container{width:480px!important}}#iubenda-cs-banner.iubenda-cs-default-floating.iubenda-cs-center:not(.iubenda-cs-top):not(.iubenda-cs-bottom) .iubenda-cs-opt-group,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-bottom):not(.iubenda-cs-center) .iubenda-cs-opt-group,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-top):not(.iubenda-cs-center) .iubenda-cs-opt-group{flex-direction:column!important}#iubenda-cs-banner.iubenda-cs-default-floating.iubenda-cs-center:not(.iubenda-cs-top):not(.iubenda-cs-bottom) .iubenda-cs-opt-group>div,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-bottom):not(.iubenda-cs-center) .iubenda-cs-opt-group>div,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-top):not(.iubenda-cs-center) .iubenda-cs-opt-group>div{width:100%!important}#iubenda-cs-banner.iubenda-cs-default-floating.iubenda-cs-center:not(.iubenda-cs-top):not(.iubenda-cs-bottom) .iubenda-cs-opt-group button,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-bottom):not(.iubenda-cs-center) .iubenda-cs-opt-group button,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-top):not(.iubenda-cs-center) .iubenda-cs-opt-group button{display:block!important;width:100%!important;text-align:center!important}#iubenda-cs-banner.iubenda-cs-default-floating.iubenda-cs-center:not(.iubenda-cs-top):not(.iubenda-cs-bottom) .iubenda-cs-opt-group-custom,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-bottom):not(.iubenda-cs-center) .iubenda-cs-opt-group-custom,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-top):not(.iubenda-cs-center) .iubenda-cs-opt-group-custom{order:2}#iubenda-cs-banner.iubenda-cs-default-floating.iubenda-cs-center:not(.iubenda-cs-top):not(.iubenda-cs-bottom) .iubenda-cs-opt-group-consent,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-bottom):not(.iubenda-cs-center) .iubenda-cs-opt-group-consent,#iubenda-cs-banner.iubenda-cs-default-floating:not(.iubenda-cs-top):not(.iubenda-cs-center) .iubenda-cs-opt-group-consent{order:1}#iubenda-cs-banner.iubenda-cs-default-floating .iubenda-cs-content{box-shadow:0 8px 48px rgba(0,0,0,.15)!important}@media (min-width:992px){#iubenda-cs-banner.iubenda-cs-default-floating .iubenda-cs-content{border-radius:4px!important;margin:16px!important}}#iubenda-cs-banner.iubenda-cs-scrollable .iubenda-banner-content{mask-image:linear-gradient(to top,rgba(0,0,0,0) 0%,black 16px)!important;-webkit-mask-image:linear-gradient(to top,rgba(0,0,0,0) 0%,black 16px)!important}#iubenda-cs-banner.iubenda-cs-fix-height .iubenda-cs-container,#iubenda-cs-banner.iubenda-cs-fix-height .iubenda-cs-content,#iubenda-cs-banner.iubenda-cs-fix-height .iubenda-cs-rationale{height:100%!important}@media (min-width:992px){#iubenda-cs-banner.iubenda-cs-fix-height.iubenda-cs-default-floating .iubenda-cs-content{height:calc(100% - 32px)!important}}#iubenda-cs-banner.iubenda-cs-fix-height .iubenda-cs-brand img{max-width:75%!important}#iubenda-cs-banner [tabindex]:not([tabindex="-1"]):focus,#iubenda-cs-banner a[href]:focus,#iubenda-cs-banner button:focus,#iubenda-cs-banner details:focus,#iubenda-cs-banner input:focus,#iubenda-cs-banner select:focus,#iubenda-cs-banner textarea:focus{outline-width:2px!important;outline-style:solid!important;outline-color:#005fcc!important;outline-offset:2px!important}.iubenda-tp-btn:not([data-tp-nostyle]){font-size:100%!important;width:auto!important;-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;background:0 0!important;box-sizing:border-box!important;-webkit-tap-highlight-color:transparent!important;-webkit-backface-visibility:hidden!important;backface-visibility:hidden!important;font-family:-apple-system,sans-serif!important;text-decoration:none!important;color:currentColor!important;background-attachment:scroll!important;background-color:transparent!important;background-image:none!important;background-position:0 0!important;background-repeat:repeat!important;border:0!important;border-color:#000!important;border-color:currentColor!important;border-radius:0!important;border-style:none!important;border-width:medium!important;bottom:auto!important;clear:none!important;clip:auto!important;counter-increment:none!important;counter-reset:none!important;cursor:auto!important;direction:inherit!important;float:none!important;font-style:inherit!important;font-variant:normal!important;font-weight:inherit!important;height:auto!important;left:auto!important;letter-spacing:normal!important;line-height:inherit!important;list-style-type:inherit!important;list-style-position:outside!important;list-style-image:none!important;margin:0!important;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:1;outline:0!important;overflow:visible!important;padding:0!important;position:static!important;quotes:"" ""!important;right:auto!important;table-layout:auto!important;text-align:left!important;text-indent:0!important;text-transform:none!important;top:auto!important;unicode-bidi:normal!important;vertical-align:baseline!important;visibility:inherit!important;white-space:normal!important;width:auto!important;word-spacing:normal!important;z-index:auto!important;background-origin:padding-box!important;background-origin:padding-box!important;background-clip:border-box!important;background-size:auto!important;-o-border-image:none!important;border-image:none!important;border-radius:0!important;border-radius:0!important;box-shadow:none!important;-moz-column-count:auto!important;column-count:auto!important;-moz-column-gap:normal!important;column-gap:normal!important;-moz-column-rule:medium none #000!important;column-rule:medium none #000!important;-moz-column-span:none!important;column-span:none!important;-moz-column-width:auto!important;column-width:auto!important;font-feature-settings:normal!important;overflow-x:visible!important;overflow-y:visible!important;-webkit-hyphens:manual!important;hyphens:manual!important;perspective:none!important;perspective-origin:50% 50%!important;text-shadow:none!important;transition:all 0s ease 0s!important;transform:none!important;transform-origin:50% 50%!important;transform-style:flat!important;word-break:normal!important;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;appearance:none!important;line-height:34px!important;height:34px!important;min-width:34px!important;border-radius:4px!important;cursor:pointer!important;font-weight:700!important;font-size:14px!important;box-shadow:0 0 0 1px rgba(0,0,0,.15)!important;color:rgba(0,0,0,.65)!important;background-color:#fff!important;display:inline-block!important;vertical-align:middle!important}.iubenda-tp-btn[data-tp-icon]{background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'%231CC691\' fill-rule=\'evenodd\' d=\'M16 7a4 4 0 0 1 2.627 7.016L19.5 25h-7l.873-10.984A4 4 0 0 1 16 7z\'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-size:32px 32px!important;background-position:top .5px left 1px!important}.iubenda-tp-btn[data-tp-circle]{border-radius:32px!important}.iubenda-tp-btn[data-tp-label]:after{content:attr(data-tp-label)!important;padding:0 16px!important;white-space:nowrap!important}.iubenda-tp-btn[data-tp-label][data-tp-icon]:after{padding-left:calc(16px + 8px + 8px)!important}.iubenda-tp-btn[data-tp-float]{position:fixed!important}.iubenda-tp-btn[data-tp-float]:not([data-tp-anchored]){margin:16px!important}.iubenda-tp-btn[data-tp-float]:focus{outline:2px solid -webkit-focus-ring-color!important}.iubenda-tp-btn[data-tp-float][data-tp-anchored]{margin:0 16px!important;border-radius:6px!important}.iubenda-tp-btn[data-tp-float][data-tp-anchored]:not([data-tp-hover]):not([data-tp-label])[data-tp-float=center-left],.iubenda-tp-btn[data-tp-float][data-tp-anchored]:not([data-tp-hover]):not([data-tp-label])[data-tp-float=center-right],.iubenda-tp-btn[data-tp-float][data-tp-anchored][data-tp-hover][data-tp-float=center-left],.iubenda-tp-btn[data-tp-float][data-tp-anchored][data-tp-hover][data-tp-float=center-right]{margin:0!important;top:75%!important;transform:translateY(-50%)!important}.iubenda-tp-btn[data-tp-float][data-tp-anchored]:not([data-tp-hover]):not([data-tp-label])[data-tp-float=center-left],.iubenda-tp-btn[data-tp-float][data-tp-anchored][data-tp-hover][data-tp-float=center-left]{left:0!important;border-top-left-radius:0!important;border-bottom-left-radius:0!important;border-left:0!important}.iubenda-tp-btn[data-tp-float][data-tp-anchored]:not([data-tp-hover]):not([data-tp-label])[data-tp-float=center-right],.iubenda-tp-btn[data-tp-float][data-tp-anchored][data-tp-hover][data-tp-float=center-right]{right:0!important;border-top-right-radius:0!important;border-bottom-right-radius:0!important;border-right:0!important}.iubenda-tp-btn[data-tp-float][data-tp-anchored]:not([data-tp-hover])[data-tp-label][data-tp-float=center-left],.iubenda-tp-btn[data-tp-float][data-tp-anchored]:not([data-tp-hover])[data-tp-label][data-tp-float=center-right]{margin:0!important;top:50%!important;border-bottom-left-radius:0!important;border-bottom-right-radius:0!important;border-bottom:0!important;transform-origin:bottom!important}.iubenda-tp-btn[data-tp-float][data-tp-anchored]:not([data-tp-hover])[data-tp-label][data-tp-float=center-left]{left:0!important;transform:translateY(-50%) rotate(90deg)!important;transform-origin:left bottom!important}.iubenda-tp-btn[data-tp-float][data-tp-anchored]:not([data-tp-hover])[data-tp-label][data-tp-float=center-right]{right:0!important;transform:translateY(-50%) rotate(-90deg)!important;transform-origin:right bottom!important}.iubenda-tp-btn[data-tp-float][data-tp-float=bottom-left],.iubenda-tp-btn[data-tp-float][data-tp-float=bottom-right]{bottom:0!important}.iubenda-tp-btn[data-tp-float][data-tp-float=bottom-left][data-tp-anchored],.iubenda-tp-btn[data-tp-float][data-tp-float=bottom-right][data-tp-anchored]{border-bottom-left-radius:0!important;border-bottom-right-radius:0!important;border-bottom:0!important}.iubenda-tp-btn[data-tp-float][data-tp-float=top-left],.iubenda-tp-btn[data-tp-float][data-tp-float=top-right]{top:0!important}.iubenda-tp-btn[data-tp-float][data-tp-float=top-left][data-tp-anchored],.iubenda-tp-btn[data-tp-float][data-tp-float=top-right][data-tp-anchored]{border-top-left-radius:0!important;border-top-right-radius:0!important;border-top:0!important}.iubenda-tp-btn[data-tp-float][data-tp-float=bottom-left],.iubenda-tp-btn[data-tp-float][data-tp-float=top-left]{left:0!important}.iubenda-tp-btn[data-tp-float][data-tp-float=bottom-right],.iubenda-tp-btn[data-tp-float][data-tp-float=top-right]{right:0!important}.iubenda-tp-btn[data-tp-float][data-tp-hover][data-tp-label]:after{max-width:0!important;overflow:hidden!important;display:block!important;padding:0!important;opacity:0!important;transition:max-width .6s ease,padding .6s ease,opacity .6s ease!important}.iubenda-tp-btn[data-tp-float][data-tp-hover][data-tp-label]:hover:after{max-width:192px!important;padding-left:calc(16px + 8px + 8px)!important;padding-right:10px!important;opacity:1!important}.iubenda-tp-btn:focus{outline-width:2px!important;outline-style:solid!important;outline-color:#005fcc!important;outline-offset:2px!important}', e), pt = !0
            }
        },
        ht = function(e) {
            if (!lt && !0 === e.banner.applyStyles) {
                var t = {
                        backgroundColor: e.banner.backgroundColor,
                        textColor: e.banner.textColor,
                        rejectButtonCaptionColor: e.banner.rejectButtonCaptionColor,
                        rejectButtonColor: e.banner.rejectButtonColor,
                        acceptButtonCaptionColor: e.banner.acceptButtonCaptionColor,
                        acceptButtonColor: e.banner.acceptButtonColor,
                        buttonTextColor: e.banner.customizeButtonCaptionColor,
                        buttonBackgroundColor: e.banner.customizeButtonColor,
                        brandBackgroundColor: e.banner.logo && e.banner.brandBackgroundColor,
                        brandTextColor: e.banner.logo && e.banner.brandTextColor,
                        fontSizeBody: e.banner.fontSize || e.banner.fontSizeBody,
                        buttonExitFontSize: e.banner.fontSize || e.banner.fontSizeCloseButton,
                        buttonExitTextColor: e.banner.logo && e.banner.brandTextColor,
                        buttonExitBackgroundColor: !e.banner.logo && e.banner.backgroundColor,
                        continueWithoutAcceptingButtonColor: e.banner.continueWithoutAcceptingButtonColor,
                        continueWithoutAcceptingButtonCaptionColor: e.banner.continueWithoutAcceptingButtonCaptionColor
                    },
                    n = function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                            n = "";
                        return e.forEach((function(e) {
                            var o = e.selector || e.selectors.join(", "),
                                i = "";
                            for (var a in e.properties) e.properties[a] && (i += "".concat(a, ": ").concat(e.properties[a]).concat(t ? "!important" : "", ";"));
                            i && (n += "".concat(o, " { ").concat(i, " }"))
                        })), n
                    }([{
                        selectors: ["#iubenda-iframe.iubenda-iframe-branded .iubenda-modal-navigation-brand", "#iubenda-iframe.iubenda-iframe-branded .purposes-header", "#iubenda-iframe.iubenda-iframe-branded .purposes-header .iub-btn", "#iubenda-iframe.iubenda-iframe-branded .iub-cmp-header", "#purposes-content-container .purposes-header", "#iubenda-cs-banner .iubenda-cs-brand"],
                        properties: {
                            "background-color": t.brandBackgroundColor,
                            color: t.brandTextColor
                        }
                    }, {
                        selector: "#iubenda-iframe.iubenda-iframe-branded .purposes-header .iub-btn:hover",
                        properties: {
                            "background-color": t.brandTextColor,
                            color: t.brandBackgroundColor
                        }
                    }, {
                        selector: "#iubenda-cs-banner .iubenda-cs-content",
                        properties: {
                            "background-color": t.backgroundColor,
                            color: t.textColor,
                            "font-size": t.fontSizeBody
                        }
                    }, {
                        selector: "#iubenda-cs-banner .iubenda-cs-close-btn",
                        properties: {
                            "font-size": t.buttonExitFontSize,
                            color: t.buttonExitTextColor,
                            "background-color": t.buttonExitBackgroundColor
                        }
                    }, {
                        selector: "#iubenda-cs-banner .iubenda-cs-opt-group",
                        properties: {
                            color: t.backgroundColor
                        }
                    }, {
                        selector: ["#iubenda-cs-banner .iubenda-cs-opt-group button", ".iubenda-alert button.iubenda-button-cancel"],
                        properties: {
                            "background-color": t.buttonBackgroundColor,
                            color: t.buttonTextColor
                        }
                    }, {
                        selectors: ["#iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-accept-btn", "#iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-btn-primary", ".iubenda-alert button.iubenda-button-confirm"],
                        properties: {
                            "background-color": t.acceptButtonColor,
                            color: t.acceptButtonCaptionColor
                        }
                    }, {
                        selector: "#iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-reject-btn",
                        properties: {
                            "background-color": t.rejectButtonColor,
                            color: t.rejectButtonCaptionColor
                        }
                    }, {
                        selector: "#iubenda-cs-banner button.iubenda-cs-cwa-button",
                        properties: {
                            "background-color": t.continueWithoutAcceptingButtonColor,
                            color: t.continueWithoutAcceptingButtonCaptionColor
                        }
                    }], !0),
                    o = document.head || document.getElementsByTagName("head")[0];
                de(n, o), lt = !0
            }
        },
        mt = function() {
            var e = document.getElementsByClassName("iubenda-advertising-preferences-link");
            ut();
            for (var t = 0; t < e.length; t++) bt(e[t])
        },
        bt = function(e) {
            e.addEventListener("click", (function(e) {
                e.stopPropagation(), e.preventDefault(), _iub.cs.ui.showCP(!1, !0)
            }))
        },
        ft = function() {
            function t() {
                i(this, t)
            }
            return r(t, [{
                key: "createMainElements",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.document_,
                        n = e.cssClass_,
                        o = t.createElement("div"),
                        i = t.createElement("div"),
                        a = t.createElement("div"),
                        r = t.createElement("div"),
                        s = t.createElement("div"),
                        c = t.createElement("div");
                    return o.id = "iubenda-iframe", o.className = "iubenda-iframe-visible", o.setAttribute("role", "dialog"), o.setAttribute("aria-modal", "true"), _iub.cs.options.banner.logo && o.classList.add("iubenda-iframe-branded"), "string" == typeof n && (o.className = o.className + " " + n), i.id = "iubenda-iframe-popup", i.setAttribute("style", "position: fixed!important; bottom: 1000%!important;"), o.appendChild(i), a.className = "iubenda-iframe-spinner", o.appendChild(a), r.id = "iubenda-iframe-content", i.appendChild(r), c.className = "iubenda-iframe-top-container", r.appendChild(c), s.id = "iubenda-iframe-overlay", o.onclick = function(e) {
                        e.stopPropagation(), Ze() && $e()
                    }, {
                        cOver: s,
                        iPPC: r,
                        spinner: a,
                        IfrPup: i,
                        mainC: o,
                        iframeContainer: c,
                        showIframe: function() {
                            i.className += " iubenda-showing-popup", i.removeAttribute("style")
                        }
                    }
                }
            }, {
                key: "createPolicyIframe",
                value: function(e, t, n) {
                    var o = e.createElement("IFRAME");
                    return o.setAttribute("src", t), o.setAttribute("scrolling", "yes"), o.setAttribute("frameBorder", "0"), o.setAttribute("allowtransparency", "true"), o.setAttribute("title", n), o
                }
            }, {
                key: "createFooterElements",
                value: function(t, n, o) {
                    var i, a = (i = o, document.createTextNode(i || "")),
                        r = _iub.cs.options,
                        s = r.lang,
                        c = e[s].banner,
                        p = r.banner.acceptButtonCaption || c.accept_button_caption,
                        l = r.banner.rejectButtonCaption || c.reject_button_caption,
                        u = G("div");
                    u.className = "iubenda-iframe-footer";
                    var d = r.banner.logo,
                        h = null;
                    if (d) {
                        (h = G("button")).setAttribute("class", "iub-btn iub-btn-back iub-btn-stroked"), h.id = "iubBackBtn", h.innerHTML = '<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m15 4-8 8 8 8" stroke="currentColor" stroke-width="3"/></svg>' + ke("modal.back"), h.setAttribute("aria-label", ke("modal.back"))
                    }
                    var m = G("div");
                    m.id = "iubFooterIabBtnContainer";
                    var b = G("div");
                    b.id = "iubFooterBtnContainer";
                    var f = G("button");
                    if (f.setAttribute("id", "iubFooterBtn"), r.banner.acceptButtonDisplay ? (f.innerHTML = p, !r.perPurposeConsent && r.banner.acceptButtonColor && f.style.setProperty("background-color", r.banner.acceptButtonColor, "important"), !r.perPurposeConsent && r.banner.acceptButtonCaptionColor && f.style.setProperty("color", r.banner.acceptButtonCaptionColor, "important")) : f.appendChild(a), r.banner.rejectButtonDisplay) {
                        var g = G("button");
                        g.setAttribute("id", "iubRejectBtn"), g.innerHTML = l, !r.perPurposeConsent && r.banner.rejectButtonColor && g.style.setProperty("background-color", r.banner.rejectButtonColor, "important"), !r.perPurposeConsent && r.banner.rejectButtonCaptionColor && g.style.setProperty("color", r.banner.rejectButtonCaptionColor, "important"), b.appendChild(g)
                    }
                    return o && b.appendChild(f), d && u.appendChild(h), u.appendChild(m), u.appendChild(b), t.appendChild(u), u.onclick = function(e) {
                        e.stopPropagation()
                    }, {
                        footer: u,
                        footerBtn: f,
                        footerRejectBtn: g || null,
                        iabBtnContainer: m,
                        backButton: h
                    }
                }
            }]), t
        }();
    _iub.ifr_cc = _iub.ifr_cc || [];
    var gt = "cookie-policy",
        vt = "per-purpose",
        yt = "tcf",
        kt = "google-additional-consent",
        Ct = new be,
        wt = new ft,
        xt = '<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m15 4-8 8 8 8" stroke="currentColor" stroke-width="3"/></svg>';

    function Pt(e) {
        return e.options.enableTcf && e.options.gdprApplies
    }
    var _t = function() {
            function e() {
                var t = this,
                    n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    o = arguments.length > 1 ? arguments[1] : void 0;
                i(this, e), this.linkA = n.linkA, this.embedP = n.embedP, this.iFrUrl = n.iFrUrl, this.inParent = n.inParent, this.closeBtnUrl = n.closeBtnUrl, this.straightShow = n.straightShow, this.onLoad = n.onLoad, this.onClose = n.onClose, this.onReject = n.onReject, this.onBack = n.onBack, this.closeOn = n.closeOn, this.shortHeightBy = n.shortHeightBy, this.addClass = n.addClass, this.disableESC = n.disableESC, this.baseZIndex = n.baseZIndex || 1e4, this.scrolling = n.scrolling || !1, this.footer = n.footer, this.footerBtnCaption = "", this.footerAcceptBtnCaption = "", this.mainDoc = null, this.mainC = null, this.iPPC = null, this.cOver = null, this.spinner = null, this.IfrPup = null, this.iFr = null, this.iframeLoadCounter = 0, this.iFrW = 800, this.iFrH = 800, this.heightReduction = 0, this.scrollX = null, this.scrollY = null, this.mainL = null, this.mainT = null, this.footerHeight = 150, this.rsTimeout = null, this.cmpWidget = o, this.closureTriggeredByFooterButton = !1, this.toggleCmpWidget = this.showAndHideIabContainer, this.isMobile = Ct.isMobile(), this.loaded = !1, this.currentView = null, this.viewsHistory = [], this.showCcpa = n.showCcpa, this.frameTitle = n.frameTitle, this.embedP || (this.embedP = this.linkA), this.iFrUrl || (this.iFrUrl = this.linkA.href), this.onBackButtonClicked = function(e) {
                    e.stopPropagation(), t.showPreviousView()
                }, "number" == typeof this.shortHeightBy && (this.heightReduction += this.shortHeightBy), this.footer && (this.heightReduction += this.footerHeight), this.straightShow ? this.showDocument(n.widgetToShow) : this.bindAll()
            }
            return r(e, [{
                key: "showDocument",
                value: function(e) {
                    var t = this;
                    this.disableESC || le(document, "onkeydown", (function(e) {
                        t.keyPressed(e)
                    })), this.mainDoc = this.inParent ? parent.document : document, this.wipeOut(), _iub.cs.ui.disablePageScrolling("iframe", this.mainDoc), this.setSizeAndPosition(), _iub.cs.ui.hideFloatingPreferencesButton(), this.isMobile && (clearTimeout(this.rsTimeout), this.rsTimeout = setTimeout((function() {
                        var e = t.inParent ? parent.window : window,
                            n = function() {
                                t.setSizeAndPosition(), t.applySizeAndPosition()
                            };
                        le(e, "resize", n), le(e, "scroll", n, {
                            passive: !0
                        })
                    }), 50));
                    var n = wt.createMainElements.call(this, {
                        document_: this.mainDoc,
                        cssClass_: this.addClass
                    });
                    this.cOver = n.cOver, this.iPPC = n.iPPC, this.spinner = n.spinner, this.IfrPup = n.IfrPup, this.mainC = n.mainC, this.iframeContainer = n.iframeContainer, this.mainContainer = this.iframeContainer.parentNode.getElementsByClassName("iubenda-iframe-top-container")[0], le(this.spinner, "click", (function(e) {
                        e.stopPropagation()
                    })), this.contentLoadedCallback = function() {
                        t.setLoaded((function() {
                            n.showIframe(), t.applySizeAndPosition()
                        }))
                    };
                    var o = this.iframeContainer.parentNode;
                    if (o.insertBefore(this.createNavigationBar(), o.childNodes[0]), this.embedP.appendChild(this.mainC), this.mainC.parentNode.insertBefore(this.cOver, this.mainC.nextSibling), this.footer && "string" == typeof this.footer.message && "string" == typeof this.footer.btnCaption) {
                        var i = wt.createFooterElements.call(this, this.iPPC, this.footer.message, this.footer.btnCaption);
                        i.footerBtn.onclick = function(e) {
                            var n = _iub.cs.state.currentView;
                            Pt(_iub.cs) && n === vt && t.perPurposeWidget.adsSection.saveEdits(), t.closeIFrame(e, "accept"), t.footer.onClick && t.footer.onClick()
                        }, i.footerRejectBtn && (i.footerRejectBtn.onclick = function(e) {
                            t.closeIFrame(e, "reject"), t.footer.onClick && t.footer.onClick()
                        }, this.footerRejectBtn = i.footerRejectBtn), i.backButton && i.backButton.addEventListener("click", this.onBackButtonClicked), this.footerBtnCaption = this.footer.btnCaption, this.footerBtn = i.footerBtn, this.acceptCaption = this.footerBtn.innerText, this.footer = i.footer, _iub.cs.options.perPurposeConsent && e !== _iub.cs.ui.WIDGET_POLICY && this.createPerPurposeWidget(), !this.showCcpa && Pt(_iub.cs) && this.getReadyForIAB(i.iabBtnContainer, e)
                    }
                    this.applySizeAndPosition(), this.resetStyles(), this.viewsHistory = [], ht(_iub.cs.options)
                }
            }, {
                key: "hideNavigationBarCookiePolicyButton",
                value: function() {
                    if (this.navigationBar)
                        for (var e = this.navigationBar.getElementsByClassName("purposes-btn-cp"), t = 0; t < e.length; ++t) e[t].setAttribute("style", "display:none!important")
                }
            }, {
                key: "showNavigationBarCookiePolicyButton",
                value: function() {
                    for (var e = this.navigationBar.getElementsByClassName("purposes-btn-cp"), t = 0; t < e.length; ++t) e[t].style.display = "flex"
                }
            }, {
                key: "handleIubendaLinkForMobile",
                value: function(e) {
                    var t;
                    le(e, "blur", (function() {
                        ne(e, "hover")
                    })), le(e, "click", (function(n) {
                        oe(e, "hover") ? ne(e, "hover") : (te(e, "hover"), n.preventDefault(), t && clearTimeout(t), t = setTimeout((function() {
                            t = null, ne(e, "hover")
                        }), 4e3))
                    }))
                }
            }, {
                key: "createNavigationBar",
                value: function() {
                    var e = this;
                    if (this.navigationBar) return this.navigationBar;
                    var t = window.document.createElement("div"),
                        n = _iub.cs.options,
                        o = n.banner.logo,
                        i = o ? '<div class="iubenda-modal-navigation-logo"><img class="iubenda-iframe-brand-img" src="' + n.banner.logo + '" alt="logo" /></div>' : "",
                        a = '<button class="iub-btn iub-btn-back iub-btn-stroked iub-desktop purposes-btn purposes-btn-back purposes-btn-stroked purposes-desktop" aria-label="' + ke("modal.back") + '">' + xt + '</button>      <button class="iub-btn iub-btn-back iub-btn-stroked iub-mobile purposes-btn purposes-btn-back purposes-btn-stroked purposes-mobile" aria-label="' + ke("modal.back") + '">' + xt + "</button>",
                        r = !_iub.cs.options.whitelabel ? '<a class="iub-iframe-brand-button" href="https://www.iubenda.com/?utm_source=cs&utm_medium=web&utm_campaign=csbr1" target="_blank" rel="noopener" aria-label="iubenda brand">' + (o ? '<svg xmlns="http://www.w3.org/2000/svg" width="181" height="40" viewBox="0 0 181 40"><g fill="currentColor" fill-rule="evenodd"><path fill-rule="nonzero" d="M51.498 17.28c.872 0 1.533.194 1.982.581.449.394.673.916.673 1.568 0 .645-.224 1.168-.673 1.568-.443.393-1.103.59-1.982.59h-1.57v2.43H49V17.28h2.498zm-.126 3.485c.624 0 1.086-.117 1.386-.349.299-.232.448-.561.448-.987 0-.42-.15-.745-.448-.977-.3-.233-.762-.349-1.386-.349h-1.445v2.662h1.445zm6.012 3.387c-.475 0-.892-.11-1.25-.33a2.323 2.323 0 0 1-.849-.919 2.912 2.912 0 0 1-.312-1.364c0-.51.104-.965.312-1.365.202-.387.485-.693.85-.92.357-.219.774-.328 1.249-.328.481 0 .9.11 1.259.329.364.226.647.532.849.92.201.393.302.848.302 1.364 0 .516-.1.97-.302 1.364a2.323 2.323 0 0 1-.85.92c-.357.219-.777.329-1.258.329zm0-.794c.455 0 .823-.168 1.102-.503.28-.323.42-.761.42-1.316 0-.562-.14-1.004-.42-1.326a1.395 1.395 0 0 0-1.102-.494c-.443 0-.807.165-1.093.494-.287.335-.43.777-.43 1.326 0 .542.143.98.43 1.316.28.335.644.503 1.093.503zm3.904-4.297l1.151 3.755 1.084-3.735h.79l1.122 3.745 1.133-3.765h.888l-1.62 4.955h-.8l-1.113-3.706-1.123 3.706H62l-1.61-4.955h.898zm9.174 5.09c-.488 0-.914-.106-1.279-.319-.37-.22-.65-.522-.84-.91-.194-.4-.292-.864-.292-1.393 0-.503.098-.952.293-1.345.189-.394.462-.7.82-.92.358-.225.78-.338 1.268-.338.475 0 .876.103 1.2.31.333.219.58.51.743.87.169.388.253.823.253 1.307v.406h-3.68c.053.516.206.9.46 1.152.266.27.621.406 1.063.406.3 0 .55-.051.752-.154.202-.097.335-.226.4-.388h.898a1.715 1.715 0 0 1-.732.959c-.364.238-.807.358-1.327.358zm-.04-4.451c-.41 0-.738.123-.985.368-.254.251-.41.597-.469 1.035h2.782c-.02-.42-.137-.758-.351-1.016-.222-.258-.547-.387-.976-.387zm3.378 4.316v-4.955h.849v.88c.156-.283.36-.509.615-.676.253-.155.536-.233.849-.233h.156v.833h-.176a1.33 1.33 0 0 0-1.22.735c-.137.239-.205.542-.205.91v2.506H73.8zm5.563.136c-.488 0-.915-.107-1.279-.32-.37-.22-.65-.522-.84-.91-.194-.4-.292-.864-.292-1.393 0-.503.098-.952.293-1.345.188-.394.462-.7.82-.92.357-.225.78-.338 1.268-.338.475 0 .875.103 1.2.31.333.219.58.51.743.87.169.388.253.823.253 1.307v.406h-3.68c.053.516.206.9.46 1.152.266.27.62.406 1.063.406.3 0 .55-.051.752-.154.202-.097.335-.226.4-.388h.898a1.715 1.715 0 0 1-.732.959c-.364.238-.807.358-1.327.358zm-.04-4.452c-.41 0-.738.123-.985.368-.254.251-.41.597-.469 1.035h2.782c-.02-.42-.137-.758-.351-1.016-.222-.258-.547-.387-.976-.387zm5.3 4.452c-.442 0-.83-.113-1.161-.34a2.187 2.187 0 0 1-.79-.918 3.179 3.179 0 0 1-.284-1.355 3.2 3.2 0 0 1 .283-1.365 2.2 2.2 0 0 1 .79-.92c.34-.219.726-.328 1.162-.328.358 0 .677.08.957.242.28.161.507.384.683.667V17h.868v7.016h-.849v-.803c-.182.297-.41.526-.683.687a1.894 1.894 0 0 1-.976.252zm.156-.794c.456 0 .823-.168 1.103-.503.28-.336.42-.774.42-1.316s-.14-.98-.42-1.316c-.28-.336-.647-.504-1.103-.504-.436 0-.797.165-1.083.494-.28.335-.42.777-.42 1.326 0 .555.14.993.42 1.316.28.335.64.503 1.083.503zM91.738 17v2.835a1.93 1.93 0 0 1 .683-.667 1.88 1.88 0 0 1 .957-.242c.442 0 .832.11 1.17.329.333.226.593.532.782.92.188.406.283.86.283 1.364 0 .496-.095.948-.283 1.355a2.212 2.212 0 0 1-.781.919c-.332.226-.722.339-1.171.339a1.89 1.89 0 0 1-.976-.252 1.983 1.983 0 0 1-.684-.687v.803h-.849V17h.869zm1.483 6.358c.443 0 .804-.168 1.084-.503.28-.323.42-.761.42-1.316 0-.549-.14-.99-.42-1.326a1.375 1.375 0 0 0-1.084-.494c-.448 0-.813.168-1.093.504-.286.342-.43.78-.43 1.316 0 .535.144.974.43 1.316.28.335.645.503 1.093.503zm2.938-4.297h.986L98.609 23l1.444-3.939H101L98.238 26h-.927l.83-1.984-1.982-4.955z"/><path d="M111.5 10c2.486 0 4.5 1.977 4.5 4.418 0 1.087-.4 2.081-1.064 2.851L115.89 30h-8.543l.926-12.508A4.35 4.35 0 0 1 107 14.418c0-2.441 2.014-4.418 4.5-4.418zm.854 9.268l-1.48 1.484v5.745h1.48v-7.229zm-.854-5.991c-.598 0-1.082.48-1.082 1.073s.484 1.074 1.082 1.074c.598 0 1.082-.48 1.082-1.074 0-.593-.484-1.073-1.082-1.073zm20.776 1.785a.32.32 0 0 1 .31.25l.008.075-.002 3.857c.645-.904 1.342-1.355 2.09-1.355.684 0 1.281.294 1.791.882.51.589.765 1.393.765 2.413 0 1.192-.394 2.151-1.18 2.879-.675.625-1.427.937-2.258.937-.388 0-.782-.07-1.183-.212a5.217 5.217 0 0 1-1.046-.519.392.392 0 0 1-.181-.332l-.001-7.805c0-.071 0-.383-.191-.479l-.035-.015-.041-.012a.119.119 0 0 1-.089-.115l-.002-.33a.12.12 0 0 1 .116-.12h1.129zM156.333 15c.17 0 .308.14.308.314v8.298c0 .07 0 .374.184.467.02.01.045.02.074.027.052.013.088.06.088.115l.002.316c0 .066-.051.12-.116.12h-1.087a.31.31 0 0 1-.308-.313v-.308c-.318.345-.627.59-.928.74-.302.15-.627.224-.976.224-.706 0-1.324-.307-1.851-.922-.528-.615-.792-1.404-.792-2.369 0-.965.292-1.848.877-2.648.584-.801 1.335-1.201 2.254-1.201.57 0 1.041.188 1.413.565v-2.352c0-.071 0-.383-.184-.48a.368.368 0 0 0-.065-.025.119.119 0 0 1-.084-.114l-.002-.334c0-.066.052-.12.116-.12h1.077zm-15.347 2.857c.792 0 1.396.276 1.795.82.373.507.561 1.233.561 2.158l-.005.2-.015.268a.235.235 0 0 1-.233.222h-4.06a.067.067 0 0 0-.067.07c.014.759.251 1.401.685 1.856.427.448 1.013.684 1.693.684.508 0 1.173-.136 1.687-.295a.136.136 0 0 1 .171.093.15.15 0 0 1 .002.076l-.07.27a.349.349 0 0 1-.182.227c-.507.252-1.267.494-2.047.494-.948 0-1.762-.235-2.32-.882-.528-.61-.802-1.586-.802-2.554 0-1.022.312-1.956.877-2.632.59-.703 1.395-1.075 2.33-1.075zm-15.437.246c.183 0 .331.15.331.337v3.926c0 .653.11 1.08.334 1.285.224.204.494.306.81.306.217 0 .462-.07.736-.207.273-.137.728-.4 1.105-.786l.005-3.749c0-.074 0-.397-.196-.497a.515.515 0 0 0-.156-.036.118.118 0 0 1-.103-.118l-.002-.342a.12.12 0 0 1 .07-.11l.046-.01h1.252c.18 0 .327.15.327.334v4.978h-.001l.003.275c.007.136.039.355.186.43.03.015.082.027.157.036a.118.118 0 0 1 .104.117l.002.343c0 .066-.052.12-.116.12h-1.256a.329.329 0 0 1-.318-.257l-.01-.077.004-.984c-.592.65-1.173 1.06-1.484 1.228a2.05 2.05 0 0 1-.987.252c-.387 0-.723-.113-1.007-.34a1.76 1.76 0 0 1-.592-.876c-.11-.357-.165-.861-.165-1.514v-2.952c0-.074 0-.397-.198-.497a.353.353 0 0 0-.092-.026l-.07-.01a.118.118 0 0 1-.103-.118l-.002-.342a.12.12 0 0 1 .07-.11l.046-.01h1.27zm35.187-.23c1.079.074 1.507.51 1.726 1.18l.073.25c.051.183.097.392.097.933l-.002 2.594c0 .09 0 .179-.002.266l.003.535c.014.203.077.333.187.39l.04.015.048.014c.053.011.092.06.092.115l.002.331c0 .066-.052.12-.116.12h-1.137a.32.32 0 0 1-.317-.323v-.631l-.466.363c-.418.32-.693.513-.824.576a1.932 1.932 0 0 1-.838.187c-.46 0-.841-.162-1.14-.485-.298-.323-.448-.748-.448-1.275 0-.333.073-.622.219-.866.199-.338.498-.724 1.038-.954.54-.23 1.002-.283 2.458-.62v-.601c-.005-.638-.106-1.289-1.143-1.225a3.85 3.85 0 0 0-1.774.553l-.232.15a.115.115 0 0 1-.162-.031.12.12 0 0 1-.02-.067v-.39c0-.205.039-.34.116-.403.429-.352 1.488-.772 2.522-.701zm-38.446.222c.231 0 .419.193.419.43v5.296c0 .11.049.212.13.279l.066.043a.36.36 0 0 1 .197.322v.095a.2.2 0 0 1-.197.202h-1.71a.197.197 0 0 1-.195-.2v-.1a.36.36 0 0 1 .129-.276l.066-.043a.357.357 0 0 0 .194-.32v-5.012a.13.13 0 0 0-.086-.123l-.04-.006a.128.128 0 0 1-.126-.13v-.164a.29.29 0 0 1 .285-.293h.868zm25.995-.146c.363 0 .675.09.937.27.261.18.47.477.624.89.094.252.146.622.158 1.11l.002.216.002 3.252c.003.113.027.356.19.439l.044.016.058.013.04.013a.119.119 0 0 1 .052.062l.007.042.002.328-.008.046a.117.117 0 0 1-.106.074l-.28.003h-.884a.314.314 0 0 1-.046-.003l-.43-.002a.274.274 0 0 1-.269-.28c0-.118.062-.225.158-.284l.085-.04c.135-.07.173-.25.184-.376v-1.046h.003V20.55c0-.6-.079-1.036-.236-1.308-.158-.271-.423-.407-.796-.407-.524 0-1.252.258-1.81.774l-.161.163v3.855c0 .073 0 .39.19.488l.023.01c.13.046.219.172.22.314a.274.274 0 0 1-.269.279h-1.682a.117.117 0 0 1-.107-.074l-.01-.046.003-.325a.12.12 0 0 1 .062-.104l.04-.013.06-.01a.322.322 0 0 0 .082-.024c.162-.083.185-.325.189-.437v-2.883l.01-.772-.002-.877c0-.071 0-.382-.188-.478l-.072-.026-.035-.016a.119.119 0 0 1-.045-.06l-.006-.039-.003-.33a.12.12 0 0 1 .071-.11l.045-.01h1.109c.149 0 .274.106.306.248l.009.074v.734c0 .043.034.078.076.078l.031-.007.03-.023c.732-.828 1.678-1.24 2.343-1.24zm-14.179.98a1.68 1.68 0 0 0-.772.198c-.17.085-.382.246-.635.482a.342.342 0 0 0-.107.25v3.718c0 .098.04.19.112.255.212.192.431.34.656.447.264.124.535.186.812.186.442 0 .853-.244 1.234-.732s.572-1.199.572-2.131c0-.86-.19-1.52-.572-1.981-.38-.461-.814-.692-1.3-.692zm19.871-.23c-.414 0-.792.182-1.13.536-.373.39-.622.914-.622 1.894 0 .989.207 1.747.621 2.273.415.527.877.79 1.385.79.364 0 .717-.16 1.06-.48a.584.584 0 0 0 .184-.427v-2.923c0-.597-.31-1.15-.816-1.453a1.32 1.32 0 0 0-.682-.21zm7.452 4.236V21.1l-.723.154c-.41.09-.675.151-.795.187l-.039.012c-.502.171-.901.367-.934 1.224-.014.358.105.655.313.891.21.237.45.355.722.355.337 0 .772-.26 1.305-.677a.395.395 0 0 0 .151-.311zm-20.709-4.192c-1.015 0-1.69 1.022-1.803 1.902a.06.06 0 0 0 .018.049.07.07 0 0 0 .05.02h3.26a.067.067 0 0 0 .067-.058l.015-.196c.013-.36-.048-.872-.47-1.319-.252-.264-.555-.398-1.137-.398zm-18.669-3.624c.452 0 .817.373.817.833 0 .46-.365.834-.817.834a.826.826 0 0 1-.817-.834c0-.46.366-.833.817-.833zM18 11a4 4 0 0 1 2.627 7.016L21.5 29h-7l.873-10.984A4 4 0 0 1 18 11z"/></g></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="181" height="40" viewBox="0 0 181 40"><g fill="none" fill-rule="evenodd"><path fill="#737373" fill-rule="nonzero" d="M51.498 17.28c.872 0 1.533.194 1.982.581.449.394.673.916.673 1.568 0 .645-.224 1.168-.673 1.568-.443.393-1.103.59-1.982.59h-1.57v2.43H49V17.28h2.498zm-.126 3.485c.624 0 1.086-.117 1.386-.349.299-.232.448-.561.448-.987 0-.42-.15-.745-.448-.977-.3-.233-.762-.349-1.386-.349h-1.445v2.662h1.445zm6.012 3.387c-.475 0-.892-.11-1.25-.33a2.323 2.323 0 0 1-.849-.919 2.912 2.912 0 0 1-.312-1.364c0-.51.104-.965.312-1.365.202-.387.485-.693.85-.92.357-.219.774-.328 1.249-.328.481 0 .9.11 1.259.329.364.226.647.532.849.92.201.393.302.848.302 1.364 0 .516-.1.97-.302 1.364a2.323 2.323 0 0 1-.85.92c-.357.219-.777.329-1.258.329zm0-.794c.455 0 .823-.168 1.102-.503.28-.323.42-.761.42-1.316 0-.562-.14-1.004-.42-1.326a1.395 1.395 0 0 0-1.102-.494c-.443 0-.807.165-1.093.494-.287.335-.43.777-.43 1.326 0 .542.143.98.43 1.316.28.335.644.503 1.093.503zm3.904-4.297l1.151 3.755 1.084-3.735h.79l1.122 3.745 1.133-3.765h.888l-1.62 4.955h-.8l-1.113-3.706-1.123 3.706H62l-1.61-4.955h.898zm9.174 5.09c-.488 0-.914-.106-1.279-.319-.37-.22-.65-.522-.84-.91-.194-.4-.292-.864-.292-1.393 0-.503.098-.952.293-1.345.189-.394.462-.7.82-.92.358-.225.78-.338 1.268-.338.475 0 .876.103 1.2.31.333.219.58.51.743.87.169.388.253.823.253 1.307v.406h-3.68c.053.516.206.9.46 1.152.266.27.621.406 1.063.406.3 0 .55-.051.752-.154.202-.097.335-.226.4-.388h.898a1.715 1.715 0 0 1-.732.959c-.364.238-.807.358-1.327.358zm-.04-4.451c-.41 0-.738.123-.985.368-.254.251-.41.597-.469 1.035h2.782c-.02-.42-.137-.758-.351-1.016-.222-.258-.547-.387-.976-.387zm3.378 4.316v-4.955h.849v.88c.156-.283.36-.509.615-.676.253-.155.536-.233.849-.233h.156v.833h-.176a1.33 1.33 0 0 0-1.22.735c-.137.239-.205.542-.205.91v2.506H73.8zm5.563.136c-.488 0-.915-.107-1.279-.32-.37-.22-.65-.522-.84-.91-.194-.4-.292-.864-.292-1.393 0-.503.098-.952.293-1.345.188-.394.462-.7.82-.92.357-.225.78-.338 1.268-.338.475 0 .875.103 1.2.31.333.219.58.51.743.87.169.388.253.823.253 1.307v.406h-3.68c.053.516.206.9.46 1.152.266.27.62.406 1.063.406.3 0 .55-.051.752-.154.202-.097.335-.226.4-.388h.898a1.715 1.715 0 0 1-.732.959c-.364.238-.807.358-1.327.358zm-.04-4.452c-.41 0-.738.123-.985.368-.254.251-.41.597-.469 1.035h2.782c-.02-.42-.137-.758-.351-1.016-.222-.258-.547-.387-.976-.387zm5.3 4.452c-.442 0-.83-.113-1.161-.34a2.187 2.187 0 0 1-.79-.918 3.179 3.179 0 0 1-.284-1.355 3.2 3.2 0 0 1 .283-1.365 2.2 2.2 0 0 1 .79-.92c.34-.219.726-.328 1.162-.328.358 0 .677.08.957.242.28.161.507.384.683.667V17h.868v7.016h-.849v-.803c-.182.297-.41.526-.683.687a1.894 1.894 0 0 1-.976.252zm.156-.794c.456 0 .823-.168 1.103-.503.28-.336.42-.774.42-1.316s-.14-.98-.42-1.316c-.28-.336-.647-.504-1.103-.504-.436 0-.797.165-1.083.494-.28.335-.42.777-.42 1.326 0 .555.14.993.42 1.316.28.335.64.503 1.083.503zM91.738 17v2.835a1.93 1.93 0 0 1 .683-.667 1.88 1.88 0 0 1 .957-.242c.442 0 .832.11 1.17.329.333.226.593.532.782.92.188.406.283.86.283 1.364 0 .496-.095.948-.283 1.355a2.212 2.212 0 0 1-.781.919c-.332.226-.722.339-1.171.339a1.89 1.89 0 0 1-.976-.252 1.983 1.983 0 0 1-.684-.687v.803h-.849V17h.869zm1.483 6.358c.443 0 .804-.168 1.084-.503.28-.323.42-.761.42-1.316 0-.549-.14-.99-.42-1.326a1.375 1.375 0 0 0-1.084-.494c-.448 0-.813.168-1.093.504-.286.342-.43.78-.43 1.316 0 .535.144.974.43 1.316.28.335.645.503 1.093.503zm2.938-4.297h.986L98.609 23l1.444-3.939H101L98.238 26h-.927l.83-1.984-1.982-4.955z"/><path fill="#1CC691" d="M111.5 10c2.486 0 4.5 1.977 4.5 4.418 0 1.087-.4 2.081-1.064 2.851L115.89 30h-8.543l.926-12.508A4.35 4.35 0 0 1 107 14.418c0-2.441 2.014-4.418 4.5-4.418zm.854 9.268l-1.48 1.484v5.745h1.48v-7.229zm-.854-5.991c-.598 0-1.082.48-1.082 1.073s.484 1.074 1.082 1.074c.598 0 1.082-.48 1.082-1.074 0-.593-.484-1.073-1.082-1.073z"/><path fill="#636363" d="M132.276 15.062a.32.32 0 0 1 .31.25l.008.075-.002 3.857c.645-.904 1.342-1.355 2.09-1.355.684 0 1.281.294 1.791.882.51.589.765 1.393.765 2.413 0 1.192-.394 2.151-1.18 2.879-.675.625-1.427.937-2.258.937-.388 0-.782-.07-1.183-.212a5.217 5.217 0 0 1-1.046-.519.392.392 0 0 1-.181-.332l-.001-7.805c0-.071 0-.383-.191-.479l-.035-.015-.041-.012a.119.119 0 0 1-.089-.115l-.002-.33a.12.12 0 0 1 .116-.12h1.129zM156.333 15c.17 0 .308.14.308.314v8.298c0 .07 0 .374.184.467.02.01.045.02.074.027.052.013.088.06.088.115l.002.316c0 .066-.051.12-.116.12h-1.087a.31.31 0 0 1-.308-.313v-.308c-.318.345-.627.59-.928.74-.302.15-.627.224-.976.224-.706 0-1.324-.307-1.851-.922-.528-.615-.792-1.404-.792-2.369 0-.965.292-1.848.877-2.648.584-.801 1.335-1.201 2.254-1.201.57 0 1.041.188 1.413.565v-2.352c0-.071 0-.383-.184-.48a.368.368 0 0 0-.065-.025.119.119 0 0 1-.084-.114l-.002-.334c0-.066.052-.12.116-.12h1.077zm-15.347 2.857c.792 0 1.396.276 1.795.82.373.507.561 1.233.561 2.158l-.005.2-.015.268a.235.235 0 0 1-.233.222h-4.06a.067.067 0 0 0-.067.07c.014.759.251 1.401.685 1.856.427.448 1.013.684 1.693.684.508 0 1.173-.136 1.687-.295a.136.136 0 0 1 .171.093.15.15 0 0 1 .002.076l-.07.27a.349.349 0 0 1-.182.227c-.507.252-1.267.494-2.047.494-.948 0-1.762-.235-2.32-.882-.528-.61-.802-1.586-.802-2.554 0-1.022.312-1.956.877-2.632.59-.703 1.395-1.075 2.33-1.075zm-15.437.246c.183 0 .331.15.331.337v3.926c0 .653.11 1.08.334 1.285.224.204.494.306.81.306.217 0 .462-.07.736-.207.273-.137.728-.4 1.105-.786l.005-3.749c0-.074 0-.397-.196-.497a.515.515 0 0 0-.156-.036.118.118 0 0 1-.103-.118l-.002-.342a.12.12 0 0 1 .07-.11l.046-.01h1.252c.18 0 .327.15.327.334v4.978h-.001l.003.275c.007.136.039.355.186.43.03.015.082.027.157.036a.118.118 0 0 1 .104.117l.002.343c0 .066-.052.12-.116.12h-1.256a.329.329 0 0 1-.318-.257l-.01-.077.004-.984c-.592.65-1.173 1.06-1.484 1.228a2.05 2.05 0 0 1-.987.252c-.387 0-.723-.113-1.007-.34a1.76 1.76 0 0 1-.592-.876c-.11-.357-.165-.861-.165-1.514v-2.952c0-.074 0-.397-.198-.497a.353.353 0 0 0-.092-.026l-.07-.01a.118.118 0 0 1-.103-.118l-.002-.342a.12.12 0 0 1 .07-.11l.046-.01h1.27zm35.187-.23c1.079.074 1.507.51 1.726 1.18l.073.25c.051.183.097.392.097.933l-.002 2.594c0 .09 0 .179-.002.266l.003.535c.014.203.077.333.187.39l.04.015.048.014c.053.011.092.06.092.115l.002.331c0 .066-.052.12-.116.12h-1.137a.32.32 0 0 1-.317-.323v-.631l-.466.363c-.418.32-.693.513-.824.576a1.932 1.932 0 0 1-.838.187c-.46 0-.841-.162-1.14-.485-.298-.323-.448-.748-.448-1.275 0-.333.073-.622.219-.866.199-.338.498-.724 1.038-.954.54-.23 1.002-.283 2.458-.62v-.601c-.005-.638-.106-1.289-1.143-1.225a3.85 3.85 0 0 0-1.774.553l-.232.15a.115.115 0 0 1-.162-.031.12.12 0 0 1-.02-.067v-.39c0-.205.039-.34.116-.403.429-.352 1.488-.772 2.522-.701zm-38.446.222c.231 0 .419.193.419.43v5.296c0 .11.049.212.13.279l.066.043a.36.36 0 0 1 .197.322v.095a.2.2 0 0 1-.197.202h-1.71a.197.197 0 0 1-.195-.2v-.1a.36.36 0 0 1 .129-.276l.066-.043a.357.357 0 0 0 .194-.32v-5.012a.13.13 0 0 0-.086-.123l-.04-.006a.128.128 0 0 1-.126-.13v-.164a.29.29 0 0 1 .285-.293h.868zm25.995-.146c.363 0 .675.09.937.27.261.18.47.477.624.89.094.252.146.622.158 1.11l.002.216.002 3.252c.003.113.027.356.19.439l.044.016.058.013.04.013a.119.119 0 0 1 .052.062l.007.042.002.328-.008.046a.117.117 0 0 1-.106.074l-.28.003h-.884a.314.314 0 0 1-.046-.003l-.43-.002a.274.274 0 0 1-.269-.28c0-.118.062-.225.158-.284l.085-.04c.135-.07.173-.25.184-.376v-1.046h.003V20.55c0-.6-.079-1.036-.236-1.308-.158-.271-.423-.407-.796-.407-.524 0-1.252.258-1.81.774l-.161.163v3.855c0 .073 0 .39.19.488l.023.01c.13.046.219.172.22.314a.274.274 0 0 1-.269.279h-1.682a.117.117 0 0 1-.107-.074l-.01-.046.003-.325a.12.12 0 0 1 .062-.104l.04-.013.06-.01a.322.322 0 0 0 .082-.024c.162-.083.185-.325.189-.437v-2.883l.01-.772-.002-.877c0-.071 0-.382-.188-.478l-.072-.026-.035-.016a.119.119 0 0 1-.045-.06l-.006-.039-.003-.33a.12.12 0 0 1 .071-.11l.045-.01h1.109c.149 0 .274.106.306.248l.009.074v.734c0 .043.034.078.076.078l.031-.007.03-.023c.732-.828 1.678-1.24 2.343-1.24zm-14.179.98a1.68 1.68 0 0 0-.772.198c-.17.085-.382.246-.635.482a.342.342 0 0 0-.107.25v3.718c0 .098.04.19.112.255.212.192.431.34.656.447.264.124.535.186.812.186.442 0 .853-.244 1.234-.732s.572-1.199.572-2.131c0-.86-.19-1.52-.572-1.981-.38-.461-.814-.692-1.3-.692zm19.871-.23c-.414 0-.792.182-1.13.536-.373.39-.622.914-.622 1.894 0 .989.207 1.747.621 2.273.415.527.877.79 1.385.79.364 0 .717-.16 1.06-.48a.584.584 0 0 0 .184-.427v-2.923c0-.597-.31-1.15-.816-1.453a1.32 1.32 0 0 0-.682-.21zm7.452 4.236V21.1l-.723.154c-.41.09-.675.151-.795.187l-.039.012c-.502.171-.901.367-.934 1.224-.014.358.105.655.313.891.21.237.45.355.722.355.337 0 .772-.26 1.305-.677a.395.395 0 0 0 .151-.311zm-20.709-4.192c-1.015 0-1.69 1.022-1.803 1.902a.06.06 0 0 0 .018.049.07.07 0 0 0 .05.02h3.26a.067.067 0 0 0 .067-.058l.015-.196c.013-.36-.048-.872-.47-1.319-.252-.264-.555-.398-1.137-.398zm-18.669-3.624c.452 0 .817.373.817.833 0 .46-.365.834-.817.834a.826.826 0 0 1-.817-.834c0-.46.366-.833.817-.833z"/><path fill="#1CC691" d="M18 11a4 4 0 0 1 2.627 7.016L21.5 29h-7l.873-10.984A4 4 0 0 1 18 11z"/></g></svg>') + "</a>" : "";
                    t.innerHTML = '<div class="purposes-header"><div class="purposes-header-left">' + i + a + '</div><div class="purposes-header-right">' + r + ((n.hasCookiePolicy ? '<button class="iub-btn iub-btn-cp iub-desktop purposes-btn purposes-btn-cp purposes-desktop"><span>' + ke("modal.see_full_cookie_policy") + '</span></button><button class="iub-btn iub-btn-cp iub-mobile purposes-btn purposes-btn-cp purposes-mobile"><span>' + ke("modal.cookie_policy") + "</span></button>" : "") + "</div></div>"), t.id = "purposes-container", t.className = "iubenda-modal-navigation", o ? (t.classList.add("iubenda-modal-navigation-brand"), t.setAttribute("style", "border-radius: 4px 4px 0 0 !important;")) : t.setAttribute("style", "background-color: #FFF !important; border-radius: 4px 4px 0 0 !important;");
                    for (var s = t.getElementsByClassName("purposes-btn-back"), c = 0; c < s.length; ++c) le(s[c], "click", this.onBackButtonClicked);
                    for (var p = t.getElementsByClassName("purposes-btn-cp"), l = 0; l < p.length; ++l) p[l].addEventListener("click", (function(t) {
                        t.stopPropagation(), _iub.cs.options.cookiePolicyInOtherWindow ? _iub.cs.ui.showCP(!0) : e.showView(gt)
                    }));
                    var u = U("iub-iframe-brand-button", t)[0];
                    return u && (this.isMobile ? this.handleIubendaLinkForMobile(u) : (le(u, "mouseover", (function() {
                        te(u, "hover")
                    })), le(u, "mouseout", (function() {
                        ne(u, "hover")
                    })))), t.addEventListener("click", (function(e) {
                        e.stopPropagation()
                    })), this.navigationBar = t, this.navigationBar
                }
            }, {
                key: "waitForVendorlist",
                value: function(e) {
                    Pt(_iub.cs) ? this.cmpWidget.getVendorList(e) : e()
                }
            }, {
                key: "showHideLogoBackButton",
                value: function(e) {
                    var t = "cookie-policy-no-logo";
                    _iub.cs.options.banner.logo && e !== gt ? ne(this.iPPC, t) : oe(this.iPPC, t) || te(this.iPPC, t)
                }
            }, {
                key: "showHideBackButton",
                value: function(e, t) {
                    for (var n = !(_iub.cs.ui.banner || e === gt || e === vt || !1 !== t && this.currentView || this.viewsHistory.length), o = Array.prototype.slice.apply(document.getElementsByClassName("purposes-btn-back")).concat(document.getElementById("iubBackBtn") || []), i = 0; i < o.length; ++i) {
                        var a = o[i];
                        n ? a.style.setProperty("display", "none", "important") : a.style.removeProperty("display")
                    }
                }
            }, {
                key: "createPolicyIframe",
                value: function() {
                    var e = this;
                    this.setSizeAndPosition();
                    var t = this.iFrUrl + (-1 !== this.iFrUrl.indexOf("?") ? "&" : "?") + "ifr=true&height=" + this.iFrH;
                    this.showCcpa && (t += "#donotsell");
                    var n = this.iFr = wt.createPolicyIframe(this.mainDoc, t, this.frameTitle);
                    le(n, "load", (function() {
                        e.iframeLoadCounter++, e.removeSpinner(), e.contentLoadedCallback()
                    })), this.iframeContainer.insertAdjacentElement("afterbegin", n)
                }
            }, {
                key: "resetStyles",
                value: function() {
                    this.footer && (this.footer.className = "iubenda-iframe-footer iubenda-iframe-footer-absolute", this.footer.style.display = ""), this.footerBtn && (this.footerAcceptBtnCaption = this.footerBtn.innerText, this.footerBtn.innerText = this.footerBtnCaption, !_iub.cs.options.perPurposeConsent && _iub.cs.options.banner.acceptButtonColor && (this.footerBtn.style.setProperty("background-color", "", "important"), this.footerBtn.style.setProperty("color", "", "important"))), this.footerRejectBtn && (this.footerRejectBtn.style.display = "none"), this.mainContainer.className = "iubenda-iframe-top-container bottom-border-radius", window.document.getElementsByClassName("purposes-btn-back")[0].innerHTML = xt
                }
            }, {
                key: "showView",
                value: function(e, t) {
                    var n = this;
                    if (this.currentView !== e) {
                        var o = _iub.cs.options,
                            i = _iub.cs.options.banner;
                        switch (null !== this.currentView ? this.hideView(this.currentView) : Re("#iubenda-iframe"), this.showHideLogoBackButton(e), this.showHideBackButton(e, t), _iub.cs.setCurrentView(e), e) {
                            case gt:
                                this.iFr || (this.createPolicyIframe(), this.mainC && this.spinner && !this.spinner.parentNode && this.mainC.appendChild(this.spinner)), this.iFr.style.display = "block", this.footer && (this.footer.className = "iubenda-iframe-footer", o.perPurposeConsent && (this.footer.style.display = "none")), this.footerBtn && (this.footerBtn.innerText = this.acceptCaption, !o.perPurposeConsent && i.acceptButtonColor && this.footerBtn.style.setProperty("background-color", i.acceptButtonColor, "important"), !o.perPurposeConsent && i.acceptButtonCaptionColor && this.footerBtn.style.setProperty("color", i.acceptButtonCaptionColor, "important")), this.footerRejectBtn && (this.footerRejectBtn.style.display = ""), this.navigationBar && (this.navigationBar.getElementsByClassName("purposes-btn-back")[0].innerHTML = xt + ke("modal.back")), this.mainContainer.className = "iubenda-iframe-top-container bottom-border-radius", this.hideNavigationBarCookiePolicyButton();
                                break;
                            case vt:
                                _iub.cs.updateTcfApi(!0), this.perPurposeWidget.show(), this.waitForVendorlist((function() {
                                    n.cmpWidget && n.cmpWidget.setDisplayed(!0), n.updatePerPurposeWidget(), n.removeSpinner(), n.contentLoadedCallback()
                                }));
                                break;
                            case yt:
                                _iub.cs.updateTcfApi(!0), this.cmpWidget.setDisplayed(!0), this.iabContainer.style.display = "flex";
                                break;
                            case kt:
                                this.hideNavigationBarCookiePolicyButton(), this.cmpWidget.acBuildUi(!0), this.iabContainer.style.display = "flex"
                        }!1 !== t && this.currentView && this.viewsHistory.push(this.currentView), this.currentView = e
                    }
                }
            }, {
                key: "isInTcfView",
                value: function() {
                    return this.currentView === yt
                }
            }, {
                key: "updatePerPurposeWidget",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (Pt(_iub.cs)) {
                        var t = _iub.cs.options,
                            n = this.perPurposeWidget.adsSection,
                            o = this.hasCMPApprovedAll(),
                            i = this.hasCMPDisapprovedAll();
                        n.tcfOptionNode.checked = !i;
                        var a = o || i ? ne : te;
                        a(n.tcfOptionNode, "half");
                        var r = t.googleAdditionalConsentMode;
                        if (2 === t.tcfVersion && r) {
                            var s = this.cmpWidget.acAreAllAllowed(),
                                c = this.cmpWidget.acAreAllDisallowed(),
                                p = s || c ? ne : te;
                            n.googleAdditionalConsentOptionNode.checked = !c, p(n.googleAdditionalConsentOptionNode, "half"), o = o && s, i = i && c
                        }
                        var l = n.genericAdsOption,
                            u = n.tcfGoogleOption,
                            d = n.googleAdditionalConsentOptionNode,
                            h = l ? l.checked : null,
                            m = u ? u.checked : null,
                            b = r && d ? d.checked : null;
                        o = o && !1 !== h && !1 !== m && !1 !== b, (i = i && !h && !m && !b) || o ? (n.unsetMiddlePrimaryOption(), this.setPrimaryOptionNodeFast(e, o)) : (n.setMiddlePrimaryOption(), this.setPrimaryOptionNodeFast(e, !0))
                    }
                }
            }, {
                key: "setPrimaryOptionNodeFast",
                value: function(e, t) {
                    var n = this.perPurposeWidget.adsSection.primaryOptionNode;
                    e ? (n.style.setProperty("transition", "none 0s", "important"), n.checked = t, n.offsetHeight, n.style.removeProperty("transition")) : n.checked = t
                }
            }, {
                key: "showPreviousView",
                value: function() {
                    var e = this.viewsHistory.pop();
                    Pt(_iub.cs) && !this.showCcpa && (this.goBackToSavedState(), _iub.cs.ui.previousTCFPreferences = {
                        cmpCookie: this.cmpWidget.getPreferenceString(),
                        customPreferences: this.cmpWidget.getCustomPreferences()
                    }), e ? this.showView(e, !1) : (_iub.cs.purposesPreference.goBackToSavedState(), this.goBackToSavedState(), this.closeIFrame(!1, "back"))
                }
            }, {
                key: "goBackToSavedState",
                value: function() {
                    if (Pt(_iub.cs) && !this.showCcpa) {
                        var e = _iub.cs.ui.cmpWidget;
                        e.purposesListView.goBackToSavedState(), e.specialFeaturesListView.goBackToSavedState(), e.goBackToSavedVendorsState(), e.goBackToSavedAcState()
                    }
                }
            }, {
                key: "hideView",
                value: function(e) {
                    switch (e) {
                        case gt:
                            this.iframeLoadCounter > 1 && (this.iframeLoadCounter = 0, this.iFr.setAttribute("src", this.iFr.getAttribute("src"))), this.iFr.style.display = "none", this.resetStyles(), this.showNavigationBarCookiePolicyButton();
                            break;
                        case vt:
                            this.perPurposeWidget.hide();
                            break;
                        case yt:
                            this.iabContainer.style.display = "none";
                            break;
                        case kt:
                            this.cmpWidget.acHide(), this.iabContainer.style.display = "none", this.showNavigationBarCookiePolicyButton()
                    }
                }
            }, {
                key: "createPerPurposeWidget",
                value: function() {
                    var e = this;
                    if (this.perPurposeWidget) return this.perPurposeWidget;
                    var t = new ot(_iub.cs);
                    _iub.cs.purposesPreference.disapproveUnexpressedPreferences(_iub.cs.purposes.toIDArray());
                    var n = t.getRootNode();
                    n.setAttribute("id", "purposes-content-container"), n.setAttribute("style", "\n      min-height: 35px!important;\n      background-color: #FFFFFF!important;\n      height: 100%!important;\n      margin-bottom: 2px!important;\n      -webkit-overflow-scrolling: touch!important;\n      border-top-left-radius: 5px!important;\n      border-top-right-radius: 5px!important;\n      width: auto!important;\n      color: rgb(0, 0, 0)!important;\n      "), n.style.setProperty("display", "none", "important"), this.iframeContainer.insertAdjacentElement("afterbegin", n), t.addEventListener("open-cookie-policy", (function() {
                        _iub.cs.options.cookiePolicyInOtherWindow ? _iub.cs.ui.showCP(!0) : e.showView(gt)
                    })), t.addEventListener("open-tcf", (function() {
                        e.showView(yt)
                    })), t.addEventListener("open-google-additional-consent", (function() {
                        e.showView(kt)
                    })), t.addEventListener("on-show", (function() {
                        _iub.cs.purposesPreference.disapproveUnexpressedPreferences(_iub.cs.purposes.toIDArray())
                    }));
                    var o = t.adsSection.tcfOptionNode,
                        i = t.adsSection.googleAdditionalConsentOptionNode;
                    o.addEventListener("save-button-clicked", (function() {
                        var t = !oe(i, "half");
                        oe(o, "half") || e.expressForAllCMPOptions(o.checked, t)
                    })), o.addEventListener("change", (function() {
                        var e = o.checked;
                        oe(o, "half") && ne(o, "half"), i && (oe(i, "half") && ne(i, "half"), i.checked = e), t.adsSection.updateAdsSectionUI()
                    }));
                    var a = this.cmpWidget;
                    return i && (i.addEventListener("save-button-clicked", (function() {
                        var e = _iub.cs.options;
                        oe(i, "half") || e.googleAdditionalConsentMode && e.perPurposeConsent && a.acEnableEntities(i.checked)
                    })), i.addEventListener("change", (function() {
                        oe(i, "half") && ne(i, "half"), t.adsSection.updateAdsSectionUI()
                    }))), this.perPurposeWidget = t, null
                }
            }, {
                key: "getReadyForIAB",
                value: function(e, t) {
                    var n = this;
                    this.captionShowTrackingButton = this.cmpWidget.getI18n().show_tracking_button, this.captionHideTrackingButton = this.cmpWidget.getI18n().hide_tracking_button;
                    var o = document.createElement("div");
                    o.setAttribute("id", "iab-container"), o.setAttribute("style", "min-height: 35px!important;background-color:#FFFFFF;height: 100%!important;margin-bottom: 2px!important;border-top-left-radius: 5px!important; border-top-right-radius: 5px!important;width: auto!important; color: rgb(0, 0, 0)!important;flex-direction: column!important;"), o.style.display = "none";
                    var i = !1,
                        a = !1,
                        r = function() {
                            i && a && (n.iframeContainer.insertAdjacentElement("afterbegin", o), _iub.cs.options.perPurposeConsent && t !== _iub.cs.ui.WIDGET_POLICY && (n.perPurposeWidget.adsSection.setupTCFGoogleAdsOption(), n.perPurposeWidget.adsSection.setupGoogleAdditionalConsentOption(), n.updatePerPurposeWidget(!0)), setTimeout((function() {
                                n.tcfWidgetLoadedCallback && n.tcfWidgetLoadedCallback(), n.contentLoadedCallback(), n.currentView !== yt && n.currentView !== kt || n.removeSpinner()
                            })))
                        };
                    if (_iub.cs.state.isCmpCssLoaded) i = !0, r();
                    else {
                        var s = document.createElement("link");
                        s.rel = "stylesheet", s.type = "text/css", s.href = "https://cdn.iubenda.com/cs/tcf/versions/tcf-v2-0.20.0.css", s.onload = function() {
                            i = !0, r()
                        }, document.getElementsByTagName("head")[0].appendChild(s), _iub.cs.state.isCmpCssLoaded += 1
                    }
                    this.cmpWidget.render((function(e) {
                        o.appendChild(e), a = !0, r()
                    }));
                    var c = document.createElement("div");
                    c.id = "iubFooterBtnIab", c.innerHTML = this.captionShowTrackingButton, c.onclick = function(e) {
                        e.stopPropagation(), 0 !== n.viewsHistory.length ? n.showPreviousView() : n.showView(yt)
                    }, this.footerBtnIab = c, _iub.cs.options.perPurposeConsent || e.appendChild(c), this.iabContainer = o
                }
            }, {
                key: "showPolicy",
                value: function() {
                    this.showView(gt)
                }
            }, {
                key: "showPerPurposeWidget",
                value: function() {
                    this.showView(vt, !1)
                }
            }, {
                key: "showTCFWidget",
                value: function(e) {
                    var t = this;
                    this.showView(yt, !1), e && this.cmpWidget.openVendorsList ? (this.cmpWidget.openVendorsList(), this.tcfWidgetLoadedCallback = function() {
                        t.scrollTcfToVendorsList()
                    }) : this.tcfWidgetLoadedCallback = function() {
                        t.scrollTcfToTop()
                    }
                }
            }, {
                key: "showAndHideIabContainer",
                value: function(e, t) {
                    this.currentView !== yt ? this.showTCFWidget(t) : this.showView(gt)
                }
            }, {
                key: "getViewPortSize",
                value: function() {
                    this.isMobile ? (this.vpWidth = (this.inParent ? parent.window.innerWidth : window.innerWidth) || this.mainDoc.documentElement.clientWidth, this.vpHeight = (this.inParent ? parent.window.innerHeight : window.innerHeight) || this.mainDoc.documentElement.clientHeight) : (this.vpWidth = Math.max(this.mainDoc.documentElement.clientWidth, window.innerWidth || 0), this.vpHeight = Math.max(this.mainDoc.documentElement.clientHeight, window.innerHeight || 0))
                }
            }, {
                key: "setSizeAndPosition",
                value: function() {
                    var e = _iub.cs.ui.getViewportSize(this.mainDoc),
                        t = e.width,
                        n = e.height,
                        o = 25;
                    t > 768 ? o = 80 : t > 480 && (o = 50), this.iFrW = Math.min(t - o, 800), this.iFrH = Math.min(n - o, 800), this.heightReduction > 0 && (this.iFrH = this.iFrH - this.heightReduction);
                    var i = this.mainDoc.documentElement,
                        a = this.inParent ? parent.window : window;
                    this.scrollX = a.pageXOffset || i.scrollLeft, this.scrollY = a.pageYOffset || i.scrollTop, this.isMobile ? (this.mainL = (t - this.iFrW) / 2 + this.scrollX, this.mainT = o / 2 + this.scrollY) : (this.mainL = (t - this.iFrW) / 2 + this.scrollX, this.mainT = 50)
                }
            }, {
                key: "applySizeAndPosition",
                value: function() {
                    null !== this.mainC && this.setStyle(this.mainC, "top:" + this.mainT + "px; left:" + this.mainL + "px; position:fixed; z-index:" + (this.baseZIndex + 1) + " !important;"), null !== this.iFr && (this.iFr.style.width = this.iFrW + "px", this.iFr.style.height = this.iFrH + "px", this.iPPC.style.width = this.iFrW + "px", this.iPPC.style.height = this.iFrH + "px")
                }
            }, {
                key: "getIFrameContainer",
                value: function() {
                    return this.IfrPup
                }
            }, {
                key: "setStyle",
                value: function(e, t) {
                    this.inParent ? parent._iub.setStyle(e, t) : _iub.setStyle(e, t)
                }
            }, {
                key: "closeIFrame",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "accept";
                    Re(), this.closureTriggeredByFooterButton = e.target === this.footerBtn || e.target === this.footerRejectBtn, this.embedP.removeChild(this.mainC), this.embedP.removeChild(this.cOver), _iub.cs.ui.restorePageScrolling("iframe", this.mainDoc), _iub.cs.ui.showFloatingPreferencesButton();
                    var n = e || window.event;
                    n && (n.stopPropagation(), n.preventDefault(), "accept" === t && "function" == typeof this.onClose ? this.onClose() : "reject" === t && "function" == typeof this.onReject ? this.onReject() : "back" === t && "function" == typeof this.onBack && this.onBack())
                }
            }, {
                key: "wipeOut",
                value: function() {
                    var e;
                    this.mainDoc && (this.mainDoc.getElementById("iubenda-iframe") && (e = this.mainDoc.getElementById("iubenda-iframe")).parentNode.removeChild(e), this.mainDoc.getElementById("iubenda-iframe-overlay") && (e = this.mainDoc.getElementById("iubenda-iframe-overlay")).parentNode.removeChild(e))
                }
            }, {
                key: "getCMPOptions",
                value: function() {
                    if (this.cmpOptions) return this.cmpOptions;
                    var e = window.document.getElementById("iub-cmp-widget"),
                        t = [];
                    if (!e) return t;
                    for (var n = e.querySelectorAll('.iub-cmp-purpose input[type="checkbox"]'), o = e.querySelectorAll('.iub-cmp-vendor input[type="checkbox"]'), i = 0; i < n.length; ++i) t.push(n[i]);
                    for (var a = 0; a < o.length; ++a) t.push(o[a]);
                    return this.cmpOptions = t, t
                }
            }, {
                key: "hasCMPApprovedAll",
                value: function() {
                    var e = this.cmpWidget;
                    if ("function" == typeof e.areAllAllowed) return e.areAllAllowed();
                    for (var t = this.getCMPOptions(), n = 0; n < t.length; ++n)
                        if (!t[n].checked) return !1;
                    return !0
                }
            }, {
                key: "hasCMPDisapprovedAll",
                value: function() {
                    var e = this.cmpWidget;
                    if ("function" == typeof e.areAllDisallowed) return e.areAllDisallowed();
                    for (var t = this.getCMPOptions(), n = 0; n < t.length; ++n)
                        if (t[n].checked) return !1;
                    return !0
                }
            }, {
                key: "expressForAllCMPOptions",
                value: function(e) {
                    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                        n = this.cmpWidget;
                    e ? (n.enableAllPurposesAndAllVendors(), t && n.enableAllCustomPurposes()) : (n.disableAllPurposesAndAllVendors(), t && n.disableAllCustomPurposes())
                }
            }, {
                key: "removeSpinner",
                value: function() {
                    this.spinner && this.spinner.parentNode && this.spinner.parentNode.removeChild(this.spinner)
                }
            }, {
                key: "setLoaded",
                value: function(e) {
                    this.loaded || ("function" == typeof e && e(), "function" == typeof this.onLoad && this.onLoad(), this.loaded = !0)
                }
            }, {
                key: "keyPressed",
                value: function(e) {
                    27 === function(e) {
                        var t = e || window.event;
                        return t ? "number" == typeof t.keyCode ? t.keyCode : "number" == typeof t.which ? t.which : "number" == typeof t.charCode ? t.charCode : null : null
                    }(e) && this.closeIFrame(e, "accept")
                }
            }, {
                key: "getDocHeight",
                value: function() {
                    var e = this.mainDoc;
                    return Math.max(Math.max(e.body.scrollHeight, e.documentElement.scrollHeight), Math.max(e.body.offsetHeight, e.documentElement.offsetHeight), Math.max(e.body.clientHeight, e.documentElement.clientHeight))
                }
            }, {
                key: "bindAll",
                value: function() {
                    var e = this;
                    this.linkA.onclick = function(t) {
                        var n = t;
                        void 0 === n && (n = window.event), n.ctrlKey || void 0 !== n.metaKey && n.metaKey || (n.target || (n.target = n.srcElement), n.preventDefault(), e.showDocument())
                    }
                }
            }, {
                key: "scrollTcfToVendorsList",
                value: function() {
                    var e = window.document.getElementById("iub-cmp-widget"),
                        t = document.getElementById("collapse-element") || document.getElementById("iub-cmp-collapse"),
                        n = document.querySelector(".iub-cmp-toggle-buttons");
                    0 !== t.offsetTop && (e.scrollTop = t.offsetTop - n.getBoundingClientRect().height)
                }
            }, {
                key: "scrollTcfToTop",
                value: function() {
                    var e = this.iabContainer;
                    e.scrollTop = 1, e.scrollTop > 0 && (e.scrollTop = 0)
                }
            }]), e
        }(),
        At = function() {
            var e = document.getElementsByClassName("iubenda-cs-preferences-link");
            ut();
            for (var t = 0, n = e.length; t < n; t++) Bt(e[t])
        },
        Bt = function(e) {
            e.getAttribute("data-iub-enabled") || (e.addEventListener("click", (function(t) {
                t.stopPropagation(), t.preventDefault();
                var n = e.getAttribute("data-accept-purposes"),
                    o = null;
                n && (o = n.split(",")), _iub.cs.ui.openPreferences({
                    event: t,
                    acceptPurposes: o
                })
            })), e.setAttribute("data-iub-enabled", 1))
        },
        St = {
            top: ["iubenda-cs-default", "iubenda-cs-top"],
            bottom: ["iubenda-cs-default", "iubenda-cs-bottom"],
            "float-top-left": ["iubenda-cs-default-floating", "iubenda-cs-top", "iubenda-cs-left"],
            "float-top-right": ["iubenda-cs-default-floating", "iubenda-cs-top", "iubenda-cs-right"],
            "float-bottom-left": ["iubenda-cs-default-floating", "iubenda-cs-bottom", "iubenda-cs-left"],
            "float-bottom-right": ["iubenda-cs-default-floating", "iubenda-cs-bottom", "iubenda-cs-right"],
            "float-top-center": ["iubenda-cs-default-floating", "iubenda-cs-top", "iubenda-cs-center"],
            "float-bottom-center": ["iubenda-cs-default-floating", "iubenda-cs-bottom", "iubenda-cs-center"],
            "float-center": ["iubenda-cs-default-floating", "iubenda-cs-center"]
        };

    function Ot() {
        var t = this,
            n = this.cs.options,
            o = e[n.lang].banner,
            i = "";
        this.banner = this.document.createElement("div"), this.banner.id = "iubenda-cs-banner", !0 === n.banner.applyStyles && (dt(), n.banner.zIndex && this.setStyle(this.banner, "z-index:" + n.banner.zIndex + " !important;"), n.banner.backgroundColor && (i += "background-color: " + n.banner.backgroundColor + " !important;"), n.banner.textColor && (i += "color: " + n.banner.textColor + " !important;"), n.banner.fontSize ? i += "font-size: " + n.banner.fontSize + " !important;" : n.banner.fontSizeBody && (i += "font-size: " + n.banner.fontSizeBody + " !important;")), ut();
        var a = St[n.banner.position];
        a || (a = St.top);
        for (var r = 0, s = a.length; r < s; r++) this.banner.classList.add(a[r]);
        !0 === n.banner.backgroundOverlay && this.banner.classList.add("iubenda-cs-overlay"), n.banner.slideDown && this.banner.classList.add("iubenda-cs-slidein"), this.banner.setAttribute("role", "alertdialog"), this.banner.setAttribute("aria-labelledby", "iubenda-cs-title"), this.banner.setAttribute("aria-describedby", "iubenda-cs-paragraph");
        var c = n.banner.content,
            p = !!c;
        if (p) te(this.banner, "iubenda-cs-no-heading");
        else {
            var l = Tt.call(this, o, n);
            c = (o.title ? '<div id="iubenda-cs-title">' + o.title + "</div>" : "") + '<div id="iubenda-cs-paragraph">' + l + "</div>"
        }
        var u = n.banner.cookiePolicyLinkCaption || o.cookie_policy_caption,
            d = '<a href="' + this.getCookiePolicyHref() + '" class="iubenda-cs-cookie-policy-lnk" target="_blank" rel="noopener">' + u + "</a>",
            h = '<a href="javascript:void(0)" class="iubenda-advertising-preferences-link">' + o.advertising_preferences_caption + "</a>",
            m = '<a href="javascript:void(0)" class="iubenda-vendor-list-link">' + o.vendor_list_caption + "</a>",
            b = '<a href="javascript:void(0)" class="iubenda-privacy-policy-link">' + o.privacy_policy_caption + "</a>",
            f = '<a href="javascript:void(0)" class="iubenda-ccpa-opt-out iubenda-do-not-sell-link">' + o.do_not_sell_caption + "</a>";
        c = (c = (c = (c = (c = (c = c.replace("%{cookie_policy_link}", d)).replace("%{advertising_preferences_link}", h)).replace("%{vendor_list_link}", m)).replace("%{privacy_policy}", b)).replace("%{do_not_sell}", f)).replace("%{purposes}", (function() {
            return function(e, t) {
                if (!t) return "";
                var n = Object.keys(t).filter((function(e) {
                    return 1 != +e
                }));
                e.enableTcf && -1 === n.indexOf("5") && n.push("5");
                return Lt(e.lang, n)
            }(n, t.cs.purposes && t.cs.purposes.purposes)
        }));
        var g = n.banner.html,
            v = "";
        if (n.banner.logo && (v = '<div class="iubenda-cs-brand"><img src="' + n.banner.logo + '" alt="logo" /></div>', te(this.banner, "iubenda-cs-branded")), !n.banner.continueWithoutAcceptingButtonDisplay && n.banner.closeButtonDisplay && te(this.banner, "iubenda-cs-padded"), null === g ? this.banner.innerHTML = '<div class="iubenda-cs-container"><div class="iubenda-cs-content" style="' + i + '"><div class="iubenda-cs-rationale">' + v + function(e) {
                if (e.banner.continueWithoutAcceptingButtonDisplay) return '<button class="iubenda-cs-cwa-button" tabindex="0" role="button" aria-pressed="false">' + e.banner.continueWithoutAcceptingButtonCaption + "</button>";
                return '<button type="button" class="iubenda-cs-close-btn" tabindex="0" role="button" aria-pressed="false"' + re({
                    display: e.banner.closeButtonDisplay ? "" : "none"
                }) + ">" + e.banner.closeButtonCaption + "</button>"
            }(n) + '<div class="iubenda-banner-content iubenda-custom-content' + (n.banner.closeButtonDisplay ? " iubenda-banner-content-padded" : "") + '" role="document">' + c + '</div><div class="iubenda-cs-counter"></div>' + function(e, t) {
                var n = function(e, t) {
                    if (!e.banner.customizeButtonDisplay) return "";
                    return '<button class="iubenda-cs-customize-btn" tabindex="0" role="button" aria-pressed="false">' + (e.banner.customizeButtonCaption || j(t.customize_button_caption, e)) + "</button>"
                }(e, t);
                n && (n = '<div class="iubenda-cs-opt-group-custom">' + n + "</div>");
                var o = function(e, t) {
                    if (!e.banner.rejectButtonDisplay) return "";
                    return '<button class="iubenda-cs-reject-btn iubenda-cs-btn-primary" tabindex="0" role="button" aria-pressed="false">' + (e.banner.rejectButtonCaption || t.reject_button_caption) + "</button>"
                }(e, t) + function(e, t) {
                    var n = e.banner.acceptButtonCaption || t.accept_button_caption;
                    if (!e.banner.acceptButtonDisplay) return "";
                    return '<button class="iubenda-cs-accept-btn iubenda-cs-btn-primary" tabindex="0" role="button" aria-pressed="false">' + n + "</button>"
                }(e, t);
                o && (o = '<div class="iubenda-cs-opt-group-consent">' + o + "</div>");
                var i = n + o;
                if (!i) return "";
                return '<div class="iubenda-cs-opt-group"' + re({
                    color: e.banner.backgroundColor
                }) + ">" + i + "</div>"
            }(n, o) + "</div></div></div>" : (-1 !== g.indexOf("%{banner_content}") && (g = g.replace("%{banner_content}", c)), this.banner.innerHTML = g), p) {
            var y = U("iubenda-banner-content", this.banner)[0];
            y && te(y, "iubenda-custom-content")
        }
        var k = !1,
            C = null,
            w = 0,
            x = "iubenda-cs-fix-height",
            P = function() {
                if (t.banner) {
                    var e = window.innerHeight;
                    k && e > w && (t.banner.classList.remove(x), k = !1);
                    var o = C.clientHeight;
                    w = e, o >= e && !k ? (t.banner.classList.add(x), k = !0) : o < e && k && (t.banner.classList.remove(x), k = !1), jt.call(t, n), Rt.call(t)
                }
            };
        n.banner.prependOnBody ? this.document.body.insertBefore(this.banner, this.document.body.firstChild) : this.document.body.appendChild(this.banner), n.banner.backgroundOverlay && Re("#iubenda-cs-banner"), Et.call(this), It.call(this, this.banner), le(this.banner, "click", (function(e) {
            t.emit("banner-click", e)
        }), !1), Ke(this.banner), this.destroyBanner = function() {
            ue(window, "resize", P)
        }, setTimeout((function() {
            var e = t.banner;
            e && (e.classList.add("iubenda-cs-visible"), t.bannerShown = !0, (C = U("iubenda-cs-container", e)[0]) && (P(), le(window, "resize", P)), jt.call(t, n), setTimeout((function() {
                t.emit("banner-shown")
            }), 100))
        }), 10), ht(n)
    }

    function Tt(e, t) {
        return t.dynamicBannerText && this.isDynamicBannerTextApplicable() ? e.dynamic.paragraph_1 || e.dynamic.paragraph_2 ? this.createLegacyDynamicBannerText(e) : this.createDynamicBannerText(e) : e.paragraph_1 + e.paragraph_2
    }

    function Et() {
        this.bannerContent = this.banner.querySelector(".iubenda-banner-content"), this.bannerContainer = this.banner.querySelector(".iubenda-cs-content"), this.bannerTitle = this.banner.querySelector("#iubenda-cs-title"), this.pageCounter = this.banner.querySelector(".iubenda-cs-counter"), this.buttonsGroup = this.banner.querySelector(".iubenda-cs-opt-group"), this.acceptButton = this.banner.querySelector(".iubenda-cs-accept-btn.iubenda-cs-btn-primary"), this.closeButton = this.banner.querySelector(".iubenda-cs-close-btn")
    }

    function Nt(e) {
        return e.map((function(e) {
            return function(e) {
                var t = ke("banner.dynamic.startQuote"),
                    n = ke("banner.dynamic.endQuote");
                return t + ke("per_purpose.purposes." + e + ".bannerName") + n
            }(e)
        }))
    }

    function Lt(e, t) {
        var n = ke("banner.dynamic.and");
        return "es" === e && (n = function(e) {
            return "i" === ke("per_purpose.purposes." + e[e.length - 1] + ".bannerName")[0] ? "e" : "y"
        }(t)), F(Nt(t).join("[or] "), n)
    }

    function It(e) {
        var t = this;
        le(e, "mouseenter", (function() {
            t._pointerOnBanner = !0
        })), le(e, "mouseleave", (function() {
            t._pointerOnBanner = !1
        })), le(e, "touchstart", (function(e) {
            e.stopPropagation()
        }), {
            passive: !0
        }), le(e, "touchmove", (function(e) {
            e.stopPropagation()
        }), {
            passive: !0
        })
    }

    function Dt(e) {
        e.addEventListener("mouseenter", (function() {
            e.classList.add("hover")
        })), e.addEventListener("mouseleave", (function() {
            e.classList.remove("hover")
        }))
    }

    function zt(e) {
        e.addEventListener("focus", (function() {
            e.classList.add("focus")
        })), e.addEventListener("blur", (function() {
            e.classList.remove("focus")
        }))
    }

    function Rt() {
        this.bannerBtns = this.bannerBtns || this.banner.querySelectorAll(".iubenda-cs-opt-group button");
        var e, t = function(e, t) {
            var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (!n) {
                if (Array.isArray(e) || (n = p(e)) || t && e && "number" == typeof e.length) {
                    n && (e = n);
                    var o = 0,
                        i = function() {};
                    return {
                        s: i,
                        n: function() {
                            return o >= e.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: e[o++]
                            }
                        },
                        e: function(e) {
                            throw e
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var a, r = !0,
                s = !1;
            return {
                s: function() {
                    n = n.call(e)
                },
                n: function() {
                    var e = n.next();
                    return r = e.done, e
                },
                e: function(e) {
                    s = !0, a = e
                },
                f: function() {
                    try {
                        r || null == n.return || n.return()
                    } finally {
                        if (s) throw a
                    }
                }
            }
        }(this.bannerBtns);
        try {
            for (t.s(); !(e = t.n()).done;) {
                var n = e.value;
                Dt(n), zt(n)
            }
        } catch (e) {
            t.e(e)
        } finally {
            t.f()
        }
    }

    function Ft(e) {
        this.banner.classList.remove("iubenda-cs-scrollable"), e.banner.html ? this.updateHasTheUserScrolledToBottom() : this.hidePageCounter(e), e.banner.acceptButtonDisplay || e.banner.closeButtonDisplay || (this.closeButton.style.display = "none")
    }

    function jt(e) {
        return e.banner.applyStyles ? e.banner.html ? Ft.call(this, e) : this.isBannerScrollable.call(this) ? (!this.closeButton || e.banner.acceptButtonDisplay || e.banner.closeButtonDisplay || this.closeButton.style.removeProperty("display"), this.banner.classList.add("iubenda-cs-scrollable"), this.updateNumberOfPages.call(this), null) : Ft.call(this, e) : Ft.call(this, e)
    }
    var Mt, Vt = new be,
        Ut = ["top-left", "top-right", "bottom-left", "bottom-right", "center-left", "center-right"],
        Ht = "rejectButtonClick",
        Wt = "bannerAcceptClicked",
        Gt = "bannerXClose",
        Yt = 0;

    function qt(e, t) {
        return e ? e.split("\n").map((function(e) {
            return t ? '<p class="iub-p">' + e + "</p>" : e
        })).join(t ? "" : "<br/>") : ""
    }

    function Xt(e, t, n) {
        null == t || t.stopPropagation(), this.hasTheUserReadTheFullBanner() ? e(n) : this.scrollBannerByOnePage(t)
    }

    function Jt() {
        this.cs.acceptAll(Wt), this.removeBanner()
    }

    function Kt() {
        this.cs.options.gdprApplies && this.cs.options.ccpaApplies ? (this.tryConsentGiven({
            eventName: Gt
        }), this.cs.acknowledgeCcpa()) : this.cs.options.gdprApplies || this.cs.options.lgpdApplies ? this.tryConsentGiven({
            eventName: Gt
        }) : this.cs.options.ccpaApplies && (this.cs.acknowledgeCcpa(), this.removeBanner())
    }

    function Zt() {
        this.tryConsentGiven({
            eventName: Ht
        }), this.cs.options.ccpaApplies && (this.cs.debug("CCPA Opt Out"), this.cs.optOutCcpa())
    }

    function $t(e, t, n) {
        return !(this.isBannerScrollable() && !this.hasTheUserReadTheFullBanner()) && (!!ce(e, n) || (!!ce(e, t) || (!(!e || ! function(e, t) {
            return ce(t, ["a", "button"]) && e && !oe(t, "iub-prevent-consent")
        }(this.cs.options.consentOnLinkAndButton, e)) || void 0)))
    }

    function Qt(e, t) {
        e.setAttribute("style", t)
    }
    var en = function() {
        function t(e) {
            i(this, t), at(this), this.cs = e, this.document = document, this.mainC = null, this.overlay = null, this.banner = null, this.CPiFrame = null, this.isMobile = Vt.isMobile(), this.bannerShown = !1, this.documentClicked = !1, this.scrollDetected = !1, this.moveDetected = !1, this.consentRejected = !1, this.consentAccepted = !1, this.freezed = !1, this.showingCookiePolicy = !1, this.lastScrollAt = 0, this.lastPositionScrollY = null, this.iFrameCloseBtnUrl = "http://localhost.cs.origin:3010/cookie_solution/close.png", this.howManyFingersStartTouch = 0, this.startX = 0, this.startY = 0, this.elementsWatchingScroll = [], this.documentHead = this.document.head || this.document.getElementsByTagName("head")[0], this.allowConsentOnScroll = !1, this.singlePageHeight = 0, this.hasTheUserScrolledToBottom = !1, this.numberOfPages = 1, this.bannerContent, this.pageCounter, this.buttonsGroup, this.bannerTitle, this.bannerContainer, this.acceptButton, this.bannerBtns, this.originalHtmlOverflow = [], this.WIDGET_PER_PURPOSE = "per-purpose", this.WIDGET_TCF = "tcf", this.WIDGET_POLICY = "policy", this.setUpBanner = Ot.bind(this), this.handlerEventScroll = this.handlerEventScroll.bind(this), this.handlerClickOnDocument = this.handlerClickOnDocument.bind(this), this.calculateStartMovement = this.calculateStartMovement.bind(this), this.handleDocumentTouchMoved = this.handleDocumentTouchMoved.bind(this), this.handlerDoubleTap = this.handlerDoubleTap.bind(this)
        }
        return r(t, [{
            key: "start",
            value: function(e, t) {
                var n = this;
                this.cs.debug("starting UI (if needed) ..."), this.setCmpWidget(e, t), this.cs.isConsentGiven() || this.isOnlyCcpaConsentGiven() ? this.cs.info("consent given, no banner to show") : (this.cs.debug("consent NOT given, setting up UI"), this.on("banner-shown", (function() {
                    _iub.cs.fireCallback("onBannerShown"), n.cs.options.banner.backgroundOverlay ? n.disablePageScrolling("banner") : n.cs.options.consentOnScroll && setTimeout((function() {
                        n.allowConsentOnScroll = !0
                    }), n.cs.options.banner.consentOnScrollDelay)
                })), this.on("banner-click", (function(e) {
                    n.bannerClicked(e)
                })), this.emit("setting-banner"), this.bindDocument(), this.setUpBanner(), this.cs.options.banner.html || this.bindBannerContentScroll()), this.bindButtons(), this.cs.debug("invoking callback.onReady (after starting UI) ..."), this.cs.csReady()
            }
        }, {
            key: "setCmpWidget",
            value: function(e, t) {
                _iub.cs.options.enableTcf ? this.cmpWidget || this.createCmp(e, t) : this.cmpWidget = null
            }
        }, {
            key: "createDynamicBannerText",
            value: function(e) {
                var t = e.dynamic,
                    n = this.cs.options.banner.applyStyles;
                return qt(j(t.body, this.cs.options), n)
            }
        }, {
            key: "createLegacyDynamicBannerText",
            value: function(e) {
                var t = e.dynamic,
                    n = this.cs.options.banner.applyStyles,
                    o = t.paragraph_1 ? j(t.paragraph_1, this.cs.options) : "",
                    i = t.paragraph_2 ? j(function(e) {
                        return e.by_scrolling || e.by_clicking_on_links || e.by_browsing ? "[if gdprApplies][if not banner.acceptButtonDisplay or not banner.rejectButtonDisplay or banner.closeButtonDisplay or consentOnScroll or consentOnLinkAndButton or consentOnElement or consentOnContinuedBrowsing or consentOnScrollHorizontal][list ".concat(e.or, "]\n").concat(e.paragraph_2, "[if consentOnScroll][or] ").concat(e.by_scrolling, "[/if][if consentOnLinkAndButton][or] ").concat(e.by_clicking_on_links, "[/if][if consentOnElement or consentOnDocument][or] ").concat(e.by_browsing, "[/if].[/list][/if][/if]") : null == e ? void 0 : e.paragraph_2
                    }(t), this.cs.options) : "";
                return qt(o, n) + qt(i, n)
            }
        }, {
            key: "bindButtons",
            value: function() {
                this.cs.debug("binding button of cookie policy link and close banner ..."), this.bindOpenCPBtns(), this.bindCloseBannerBtns(), this.bindOpenCmpBtns(this.banner), this.bindCcpaBtns(), this.bindVendorListBtns()
            }
        }, {
            key: "bindBannerContentScroll",
            value: function() {
                var e = this,
                    t = null;
                le(this.bannerContent, "scroll", (function() {
                    null !== t && clearTimeout(t), t = setTimeout((function() {
                        e.isBannerScrolledToTop() && e.hidePageCounter(), e.updateNumberOfPages()
                    }), 150)
                }), {
                    passive: !0
                })
            }
        }, {
            key: "bindOpenCPBtns",
            value: function() {
                var e = this;
                U("iubenda-cs-cookie-policy-lnk").forEach((function(t) {
                    le(t, "click", (function(t) {
                        e.bannerCookiePolicyClicked({
                            event: t,
                            isCookiePolicyLink: !0
                        })
                    }), !0)
                }))
            }
        }, {
            key: "bindCloseBannerBtns",
            value: function() {
                var e = this,
                    t = U("iubenda-cs-close-btn"),
                    n = U("iubenda-cs-cwa-button");
                t.concat(n).forEach((function(t) {
                    le(t, "click", (function(t) {
                        e.bannerCloseBtnClicked(t)
                    }), !0)
                }))
            }
        }, {
            key: "bindOpenCmpBtns",
            value: function(e) {
                for (var t = U("iubenda-advertising-preferences-link", e), n = 0; n < t.length; n++) bt(t[n]);
                for (var o = U("iubenda-cs-preferences-link", this.banner), i = 0; i < o.length; i++) Bt(o[i])
            }
        }, {
            key: "bindCcpaBtns",
            value: function() {
                if (this.banner)
                    for (var e = this.banner.querySelectorAll(".iubenda-ccpa-opt-out"), t = 0; t < e.length; t++) this.cs.handleAskOptOutClick(e[t])
            }
        }, {
            key: "showTcfVendors",
            value: function() {
                this.showCP(!1, !0, !0)
            }
        }, {
            key: "bindVendorListBtns",
            value: function() {
                for (var e = this, t = H(["iubenda-vendor-list-link", "iubenda-vendors-list-link"]), n = 0; n < t.length; n++) t[n].getAttribute("data-iub-enabled") || (le(t[n], "click", (function(t) {
                    t.stopPropagation(), t.preventDefault(), e.showTcfVendors()
                })), t[n].setAttribute("data-iub-enabled", 1))
            }
        }, {
            key: "createCmp",
            value: function(t, n) {
                this.previousTCFPreferences && (t = this.previousTCFPreferences.cmpCookie, n = this.previousTCFPreferences.customPreferences);
                var o = _iub.cs.options.lang,
                    i = 1 === _iub.cs.options.tcfVersion ? "cmp" : "tcf_v2",
                    a = e[o];
                a || (a = e.en);
                var r = a[i] || e.en[i],
                    s = _iub.cs.getCustomPurposes();
                this.cmpWidget = new _iub.cmp.Widget(t, o, r, s, n, {
                    popoverListen: Ke,
                    promiseCreate: rt
                })
            }
        }, {
            key: "isBannerScrolledToBottom",
            value: function() {
                if (!this.banner) return !0;
                if (!this.bannerContent) return !0;
                var e = this.bannerContent.scrollHeight,
                    t = this.bannerContent.scrollTop + this.bannerContent.clientHeight,
                    n = Math.abs(e - t);
                return this.bannerContent && n <= 10
            }
        }, {
            key: "isBannerScrolledToTop",
            value: function() {
                return 0 === this.bannerContent.scrollTop
            }
        }, {
            key: "hidePageCounter",
            value: function() {
                this.pageCounter.style.display = "none", this.calculateSinglePageHeight(), this.updateNumberOfPages()
            }
        }, {
            key: "hasTheUserReadTheFullBanner",
            value: function() {
                return this.hasTheUserScrolledToBottom
            }
        }, {
            key: "scrollBannerByOnePage",
            value: function(e) {
                this.cs.debug("cannot give consent while banner text isn't scrolled to bottom"), this.cs.debug("scrolling banner by one page..."), this.cs.debug("displaying page counter on the banner..."), this.pageCounter.style.display = "block", this.calculateSinglePageHeight(), this.updateNumberOfPages(), e.target.classList.remove("hover"), e.target.classList.remove("focus"), this.bannerContent && (this.bannerContent.scrollTop += this.singlePageHeight)
            }
        }, {
            key: "handlerClickOnDocument",
            value: function(e) {
                this.clickOnDocument(e)
            }
        }, {
            key: "handlerEventScroll",
            value: function(e) {
                var t;
                if (e = e || window.event, (null === (t = this.cs) || void 0 === t ? void 0 : t.options.consentOnScroll) && this.allowConsentOnScroll && !this._pointerOnBanner && this.hasTheUserReadTheFullBanner()) {
                    var n = e.target;
                    if (V(n, "marquee"));
                    else
                        for (var o = 0; o < this.elementsWatchingScroll.length; o++)
                            if ("#document" !== this.elementsWatchingScroll[o].nodeName) {
                                var i = this.elementsWatchingScroll[o].scrollTop,
                                    a = this.elementsWatchingScroll[o].scrollLeft;
                                (i > 0 || a > 0 && this.cs.options.consentOnScrollHorizontal) && this.documentScrolled()
                            } else {
                                var r = this.elementsWatchingScroll[o],
                                    s = r.documentElement ? r.documentElement.scrollTop : r.scrollTop,
                                    c = r.body ? r.body.scrollTop : 0;
                                void 0 !== s && 0 === c || (s = c);
                                var p = r.documentElement ? r.documentElement.scrollLeft : r.scrollLeft,
                                    l = r.body ? r.body.scrollLeft : 0;
                                void 0 !== p && 0 === l || (p = l), 0 !== s || 0 !== p && this.cs.options.consentOnScrollHorizontal ? this.documentScrolled() : this.cs.debug("document not scrolled in Y axis. Consent is not given.")
                            }
                }
            }
        }, {
            key: "removeBanner",
            value: function() {
                var e;
                this.cs.debug("closing banner ..."), Se && (Se = !1, ue(document.body, "focusin", Le), ue(window, "keydown", Ie), ue(document, "mousedown", De), ue(document, "mouseup", ze)), Be = null, Y((e = "iubenda-cs-banner", document.getElementById(e))), this.restorePageScrolling("banner"), _iub.cs.fireCallback("onBannerClosed"), "function" == typeof this.destroyBanner && this.destroyBanner(), this.banner = null, this.previousTCFPreferences = null
            }
        }, {
            key: "calculateStartMovement",
            value: function(e) {
                this.cs.debug("touchstart detected ..."), this.howManyFingersStartTouch = e.touches ? e.touches.length : 2;
                var t = e.changedTouches ? e.changedTouches[0] : e,
                    n = t.pageY ? t.pageY : t.clientY,
                    o = t.pageX ? t.pageX : t.clientX;
                this.startX = o, this.startY = n
            }
        }, {
            key: "handleDocumentTouchMoved",
            value: function(e) {
                this.cs.debug("touchmove detected ..."), this.documentTouchMoved(e, this.howManyFingersStartTouch, this.startX, this.startY, !0)
            }
        }, {
            key: "bindDocument",
            value: function() {
                this.cs.debug("binding document ..."), le(this.document, "click", this.handlerClickOnDocument, !1), this.isMobile ? (this.elementsWatchingScroll.push(this.document), le(this.document, "touchstart", this.calculateStartMovement, {
                    passive: !0
                }), le(this.document, "touchmove", this.handleDocumentTouchMoved, {
                    passive: !0
                }), le(window, "touchend", this.handlerDoubleTap, {
                    passive: !0
                })) : this.addEventListenerForScroll()
            }
        }, {
            key: "getArrayOfElements",
            value: function(e) {
                if (e && "string" == typeof e) {
                    var t = se(e);
                    return t.length > 0 ? t : null
                }
                return e instanceof HTMLElement ? [e] : null
            }
        }, {
            key: "addEventListenerForScroll",
            value: function() {
                var e = this.getArrayOfElements(this.cs.options.consentOnScrollOnElement) || [this.document];
                this.elementsWatchingScroll = e, le(this.document, "scroll", this.handlerEventScroll, {
                    passive: !0
                });
                for (var t = 0; t < this.elementsWatchingScroll.length; t++) le(this.elementsWatchingScroll[t], "scroll", this.handlerEventScroll, {
                    passive: !0
                })
            }
        }, {
            key: "removeScrollObserver",
            value: function() {
                ue(this.document, "scroll", this.handlerEventScroll, {
                    passive: !0
                });
                for (var e = 0; e < this.elementsWatchingScroll.length; e++) ue(this.elementsWatchingScroll[e], "scroll", this.handlerEventScroll, {
                    passive: !0
                })
            }
        }, {
            key: "handlerDoubleTap",
            value: function(e) {
                var t = (new Date).getTime(),
                    n = t - Yt;
                clearTimeout(Mt), n < 500 && n > 0 ? (this.cs.debug("double tap ..."), e.preventDefault()) : Mt = setTimeout((function() {
                    clearTimeout(Mt)
                }), 500), Yt = t
            }
        }, {
            key: "calculateSinglePageHeight",
            value: function() {
                if (!this.bannerContainer || !this.bannerContent) return 0;
                var e = parseInt(window.getComputedStyle(this.bannerContainer).paddingTop[0]),
                    t = parseInt(window.getComputedStyle(this.bannerContainer).paddingBottom[0]) + e,
                    n = this.bannerContainer.scrollHeight;
                return n -= t, this.buttonsGroup && (n -= this.buttonsGroup.scrollHeight), this.bannerTitle && (n -= this.bannerTitle.scrollHeight), "none" !== this.pageCounter.style.display && (n -= parseInt(window.getComputedStyle(this.pageCounter).marginTop[0]), n -= this.pageCounter.scrollHeight), this.singlePageHeight = n, n
            }
        }, {
            key: "isBannerScrollable",
            value: function() {
                return !!this.calculateSinglePageHeight() && this.bannerContent.scrollHeight > this.singlePageHeight
            }
        }, {
            key: "updateNumberOfPages",
            value: function() {
                var e = Math.ceil(this.bannerContent.scrollHeight / this.singlePageHeight),
                    t = Math.ceil(this.bannerContent.scrollTop / this.singlePageHeight);
                this.numberOfPages = e, this.updateHasTheUserScrolledToBottom(), this.pageCounter.innerText = ke("banner.page_counter_caption") + " " + t + "/" + e
            }
        }, {
            key: "updateHasTheUserScrolledToBottom",
            value: function() {
                this.isBannerScrolledToBottom() && (this.hasTheUserScrolledToBottom = !0)
            }
        }, {
            key: "bannerClicked",
            value: function(e) {
                this.cs.debug("banner clicked");
                for (var t = e.target; t;) {
                    if (oe(t, "iubenda-cs-accept-btn")) {
                        this.bannerAcceptBtnClicked(e);
                        break
                    }
                    if (oe(t, "iubenda-cs-customize-btn")) {
                        _iub.cs.options.perPurposeConsent && (this.mustShowPerPurposeView = !0), _iub.cs.options.enableTcf && !_iub.cs.options.perPurposeConsent && _iub.cs.ui.showCP(!1, !0), this.bannerCookiePolicyClicked({
                            event: e
                        });
                        break
                    }
                    if (oe(t, "iubenda-cs-reject-btn")) {
                        this.onRejectButtonClick(e);
                        break
                    }
                    if (t === e.currentTarget) break;
                    t = t.parentNode
                }
                e.stopPropagation()
            }
        }, {
            key: "openPreferences",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.cs.options.perPurposeConsent ? this.mustShowPerPurposeView = !0 : this.cs.options.enableTcf && (this.mustShowTCFView = !0), this.bannerCookiePolicyClicked(e)
            }
        }, {
            key: "bannerCookiePolicyClicked",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.event,
                    n = e.isCookiePolicyLink,
                    o = e.acceptPurposes;
                if (this.cs.debug("banner's cookie policy link clicked"), !this.cs.isCpOpen()) {
                    this.cs.options.cookiePolicyInOtherWindow || (this.showingCookiePolicy = !0), t && (t.preventDefault(), t.stopPropagation());
                    var i = this.cs.options.cookiePolicyInOtherWindow && n,
                        a = this.cs.options.cookiePolicyInOtherWindow && !this.cs.options.enableTcf && !this.cs.options.perPurposeConsent,
                        r = this.cs.options.cookiePolicyInOtherWindow && this.cs.options.enableTcf && !this.cs.options.perPurposeConsent,
                        s = i || a || r;
                    this.showCP(s, !1, !1, !1, o)
                }
            }
        }, {
            key: "showCP",
            value: function(t, n, o, i, a) {
                var r = this,
                    s = null,
                    c = this.getCookiePolicyHref(),
                    p = ke("banner.cookie_policy_caption");
                if (i && (c = this.cs.options.privacyPolicyUrl, p = ke("banner.privacy_policy_caption")), $e(), this.consentRejected = !1, this.consentAccepted = !1, t) window.open(c, "_blank");
                else {
                    i || (s = {
                        message: "string" == typeof this.cs.options.footer.message ? this.cs.options.footer.message : e[this.cs.options.lang].footer.message,
                        btnCaption: "string" == typeof this.cs.options.footer.btnCaption ? this.cs.options.footer.btnCaption : e[this.cs.options.lang].footer.btnCaption
                    });
                    var l, u = _iub.cs.getSavedPreferences();
                    switch (_iub.cs.options.enableTcf && this.createCmp(u.cmpCookie, u.customPreferences), _iub.cs.options.perPurposeConsent && this.mustShowPerPurposeView ? (this.mustShowPerPurposeView = !1, l = this.WIDGET_PER_PURPOSE) : _iub.cs.options.enableTcf && _iub.cs.options.gdprApplies && (this.mustShowTCFView || n) ? (this.mustShowTCFView = !1, l = this.WIDGET_TCF) : l = this.WIDGET_POLICY, l === this.WIDGET_PER_PURPOSE && _iub.cs.purposesPreference.saveCurrentPreferencesState(), this.CPiFrame = new _t({
                        iFrUrl: c,
                        inParent: !1,
                        straightShow: !0,
                        closeBtnUrl: this.iFrameCloseBtnUrl,
                        embedP: document.getElementsByTagName("body")[0],
                        disableESC: !0,
                        baseZIndex: this.cs.options.banner.zIndex + 1,
                        scrolling: null != this.cs.options.cookiePolicyUrl,
                        showCcpa: i,
                        footer: s,
                        widgetToShow: l,
                        frameTitle: p,
                        onLoad: function() {
                            if (l === r.WIDGET_PER_PURPOSE) {
                                var e, t = null !== (e = null == a ? void 0 : a.reduce((function(e, t) {
                                    var n = r.CPiFrame.mainC.querySelector("#purpose-" + t);
                                    return n && !n.checked && e.push({
                                        toggle: n,
                                        purpose: t
                                    }), e
                                }), [])) && void 0 !== e ? e : [];
                                if (null == t ? void 0 : t.length) {
                                    var n = t[0].purpose;
                                    r.scrollWidgetToPurpose(n, (function() {
                                        t.forEach((function(e) {
                                            return e.toggle.click()
                                        }))
                                    }))
                                }
                            }
                            r.cookiePolicyLoaded()
                        },
                        onClose: function() {
                            r.cookiePolicyClosed({
                                eventName: "cookiePolicyClosed"
                            })
                        },
                        onReject: function() {
                            r.cookiePolicyClosed({
                                eventName: Ht
                            })
                        },
                        onBack: function() {
                            r.cookiePolicyClosed({
                                eventName: "backButtonClick"
                            })
                        }
                    }, this.cmpWidget), l) {
                        case this.WIDGET_PER_PURPOSE:
                            this.CPiFrame.showPerPurposeWidget();
                            break;
                        case this.WIDGET_TCF:
                            this.CPiFrame.showTCFWidget(o);
                            break;
                        default:
                            this.CPiFrame.showPolicy()
                    }
                    this.cs.setCpOpen(!0)
                }
            }
        }, {
            key: "scrollWidgetToPurpose",
            value: function(e, t) {
                var n, o, i, a = this.CPiFrame.mainC.querySelector(".purposes-content"),
                    r = this.CPiFrame.mainC.querySelector(".iub-consent-buttons.purposes-buttons"),
                    s = a.querySelector(".purposes-header"),
                    c = this.CPiFrame.mainC.querySelector(".purpose-item-" + e);
                a && c && r && s && (n = a.scrollTop, o = c.offsetTop - r.clientHeight - s.offsetTop - n, i = Date.now(), 0 === o ? t() : requestAnimationFrame((function e() {
                    var r = Math.min((Date.now() - i) / 250, 1);
                    a.scrollTop = n + o * r, 1 === r ? t() : requestAnimationFrame(e)
                })))
            }
        }, {
            key: "showCcpaOptOutConfirmBox",
            value: function() {
                var e = this;
                if (!this.cs.state.ccpaOptOutConfirmationOpen) {
                    this.cs.state.ccpaOptOutConfirmationOpen = !0;
                    var t = document.createElement("div");
                    t.className = "iubenda-alert", t.id = "iubenda-alert", t.setAttribute("role", "dialog"), t.setAttribute("aria-labelledby", "iubenda-alert-dialog-content"), t.setAttribute("aria-modal", "true");
                    var n = document.createElement("div");
                    n.className = "iubenda-alert-dialog";
                    var o = document.createElement("div");
                    o.className = "iubenda-alert-dialog-content", o.id = "iubenda-alert-dialog-content", o.innerText = ke("ccpa.opt_out_prompt");
                    var i = document.createElement("div");
                    i.className = "iubenda-alert-dialog-buttons";
                    var a = function(n) {
                            Re(), "confirm" == n && e.cs.optOutCcpa(), document.body.removeChild(t), e.cs.state.ccpaOptOutConfirmationOpen = !1
                        },
                        r = document.createElement("button");
                    r.className = "iubenda-button-cancel", r.innerText = ke("ccpa.opt_out_cancel"), r.addEventListener("click", (function() {
                        return a("cancel")
                    }));
                    var s = document.createElement("button");
                    s.className = "iubenda-button-confirm", s.innerText = ke("ccpa.opt_out_confirm"), s.addEventListener("click", (function() {
                        return a("confirm")
                    })), t.appendChild(n), n.appendChild(o), n.appendChild(i), i.appendChild(r), i.appendChild(s), document.body.appendChild(t), Re("#".concat(t.id))
                }
            }
        }, {
            key: "createFloatingPreferencesButton",
            value: function() {
                if (document.querySelector(".iubenda-tp-btn.iubenda-cs-preferences-link")) return null;
                this.cs.options.enableTcf && !this.cs.options.skipTcfValidation && void 0 === _iub.csConfiguration.floatingPreferencesButtonDisplay && (0 === document.querySelectorAll(".iubenda-advertising-preferences-link").length && (this.cs.options.floatingPreferencesButtonDisplay = !0));
                var t = this.cs.options.floatingPreferencesButtonDisplay,
                    n = this.cs.options.floatingPreferencesButtonForceDisplay;
                if (!(t && this.cs.isPreferenceExpressed() || n)) return null;
                var o = !1;
                "string" == typeof t && /^anchored\-/.test(t) && (t = t.replace(/^anchored\-/, ""), o = !0), !0 === this.cs.options.banner.applyStyles && dt();
                var i, a, r = document.createElement("a");
                return r.className = "iubenda-tp-btn iubenda-cs-preferences-link", r.setAttribute("href", "javascript:void();"), r.setAttribute("title", e[this.cs.options.lang].per_purpose.widget_title), -1 !== Ut.indexOf(t) ? i = t : (i = "bottom-right", o = !1), r.setAttribute("data-tp-float", i), r.style.setProperty("z-index", this.cs.options.floatingPreferencesButtonZIndex, "important"), (this.cs.options.floatingPreferencesButtonIcon || !this.cs.options.floatingPreferencesButtonCaption || this.cs.options.floatingPreferencesButtonHover) && r.setAttribute("data-tp-icon", "data-tp-icon"), this.cs.options.floatingPreferencesButtonRound && r.setAttribute("data-tp-circle", "data-tp-circle"), o && r.setAttribute("data-tp-anchored", "data-tp-anchored"), this.cs.options.floatingPreferencesButtonHover && r.setAttribute("data-tp-hover", "data-tp-hover"), "string" == typeof this.cs.options.floatingPreferencesButtonCaption ? a = this.cs.options.floatingPreferencesButtonCaption : !0 === this.cs.options.floatingPreferencesButtonCaption && (a = ke("floating_preferences_button.caption")), a && r.setAttribute("data-tp-label", a), this.cs.options.floatingPreferencesButtonColor && r.style.setProperty("background-color", this.cs.options.floatingPreferencesButtonColor, "important"), this.cs.options.floatingPreferencesButtonCaptionColor && r.style.setProperty("color", this.cs.options.floatingPreferencesButtonCaptionColor, "important"), document.body.appendChild(r), r
            }
        }, {
            key: "hideFloatingPreferencesButton",
            value: function() {
                var e = document.querySelector(".iubenda-tp-btn.iubenda-cs-preferences-link");
                e && e.style.setProperty("display", "none", "important")
            }
        }, {
            key: "showFloatingPreferencesButton",
            value: function() {
                var e = document.querySelector(".iubenda-tp-btn.iubenda-cs-preferences-link");
                e && e.style.setProperty("display", "inline-block", "important")
            }
        }, {
            key: "getCookiePolicyHref",
            value: function() {
                return this.cs.options.cookiePolicyUrl || "https://www.iubenda.com/privacy-policy/" + this.cs.options.cookiePolicyId + "/cookie-policy?an=no&s_ck=false&newmarkup=yes"
            }
        }, {
            key: "cookiePolicyLoaded",
            value: function() {
                this.cs.debug("cookie policy shown"), this.showingCookiePolicy = !0, _iub.cs.fireCallback("onCookiePolicyShown")
            }
        }, {
            key: "cookiePolicyClosed",
            value: function(e) {
                (e = e || {}).eventName = e.eventName || "cookiePolicyClosed", e.force = !0, this.cs.debug("cookie policy closed"), this.showingCookiePolicy = !1, "backButtonClick" !== e.eventName && this.CPiFrame.closureTriggeredByFooterButton && this.tryConsentGiven(e), this.cs.setCpOpen(!1)
            }
        }, {
            key: "showPPCcpaSection",
            value: function(e) {
                this.showCP(e, !1, !1, !0)
            }
        }, {
            key: "bannerCloseBtnClicked",
            value: function(e) {
                this.cs.debug("banner X clicked"), this.cs.options.banner.closeButtonRejects ? this.onRejectButtonClick(e) : Xt.call(this, Kt.bind(this), e)
            }
        }, {
            key: "onRejectButtonClick",
            value: function(e) {
                this.cs.debug("banner Reject clicked"), Xt.call(this, Zt.bind(this), e)
            }
        }, {
            key: "bannerAcceptBtnClicked",
            value: function(e) {
                this.cs.debug("banner Accept clicked"), Xt.call(this, Jt.bind(this), e)
            }
        }, {
            key: "clickOnDocument",
            value: function(e) {
                var t = this;
                if ("Firefox" !== _iub.cs.browserDetect.browser || 2 !== e.button)
                    if (!1 !== this.cs.options.consentOnContinuedBrowsing && this.hasTheUserReadTheFullBanner()) {
                        if (!e.target || !oe(e.target, "iubenda-button-cancel") && !oe(e.target, "iubenda-button-confirm")) {
                            void 0 === (e = e || window.event).target && (e.target = e.srcElement);
                            var n = function(e) {
                                    t.cs.debug(e)
                                },
                                o = function(e) {
                                    t.tryConsentGiven({
                                        eventName: e
                                    })
                                },
                                i = this.cs.options,
                                a = e.target,
                                r = (i.consentOnElement || "").split(/\s*,\s*/),
                                s = se(r),
                                c = ["a", "button"].concat(r).concat(s);
                            if (n("document clicked on target", a && a.tagName), n((i.consentOnDocument, "enabled")), i.consentOnDocument && this.hasTheUserReadTheFullBanner()) return n("trying consentGiven due document clicked && consentOnDocument"), o("documentClicked");
                            n("options.consentOnElement is [" + r.join(", ") + "]"), n("accepted Targets are " + c.join(", "));
                            var p = ce(a, c) ? a : pe(a, (function(e) {
                                return ce(e, c)
                            }));
                            $t.call(this, p, s, r) ? (n("trying consentGiven due a, button or consentOnElement clicked"), o("documentClicked")) : V(p, "a") && this.cs.activator.emit("re-enable-navigation")
                        }
                    } else this.cs.activator.emit("re-enable-navigation")
            }
        }, {
            key: "documentScrolled",
            value: function() {
                this.cs.debug("document scrolled"), this.showingCookiePolicy || this.consentRejected || this.tryConsentGiven({
                    eventName: "documentScroll"
                })
            }
        }, {
            key: "documentTouchMoved",
            value: function(e, t, n, o) {
                var i, a;
                if (this.cs.options.consentOnScroll)
                    if ("Explorer" === Vt.browser) {
                        if (i = 10, o - (a = e).clientY > i || o - a.clientY < -i) {
                            if (this.showingCookiePolicy) return !0;
                            this.tryConsentGiven({
                                eventName: "documentMoved"
                            })
                        }
                    } else if (1 === e.touches.length && 1 === t && (a = e.changedTouches[0], i = 10, "Safari" === Vt.browser && (i = 15), o - a.pageY > i || o - a.pageY < -i)) {
                    if (this.showingCookiePolicy) return !0;
                    if (o - a.pageY > i || o - a.pageY < -i) {
                        if (this.showingCookiePolicy) return !0;
                        this.tryConsentGiven({
                            eventName: "documentMoved"
                        })
                    }
                }
            }
        }, {
            key: "isDynamicBannerTextApplicable",
            value: function() {
                return ["it", "en", "en-GB", "de", "es", "fr", "pt-BR", "ru", "nl", "pt"].indexOf(this.cs.options.lang) > -1
            }
        }, {
            key: "getViewportSize",
            value: function(e) {
                var t = e || document;
                if (this.isMobile) {
                    var n = this.inParent ? parent.window : window;
                    return {
                        width: n.innerWidth || t.clientWidth,
                        height: n.innerHeight || t.clientHeight
                    }
                }
                return {
                    width: Math.max(t.clientWidth || 0, window.innerWidth || 0),
                    height: Math.max(t.clientHeight || 0, window.innerHeight || 0)
                }
            }
        }, {
            key: "disablePageScrolling",
            value: function(e, t) {
                var n = (t || document).getElementsByTagName("html")[0].style,
                    o = this.originalHtmlOverflow[this.originalHtmlOverflow.length - 1];
                o && o.callerName === e || (this.originalHtmlOverflow.push({
                    callerName: e,
                    general: n.overflow,
                    x: n.overflowX,
                    y: n.overflowY
                }), n.removeProperty("overflow"), n.overflowX = n.overflowY = "hidden")
            }
        }, {
            key: "restorePageScrolling",
            value: function(e, t) {
                var n = this.originalHtmlOverflow[this.originalHtmlOverflow.length - 1];
                if (n && n.callerName === e) {
                    var o = (t || document).getElementsByTagName("html")[0].style;
                    o.overflow = n.general, o.overflowX = n.x, o.overflowY = n.y, this.originalHtmlOverflow.pop()
                }
            }
        }, {
            key: "isOnlyCcpaConsentGiven",
            value: function() {
                return !(!this.cs.options.ccpaApplies || this.cs.options.gdprApplies) && "" !== this.cs.usPrivacyCookie
            }
        }, {
            key: "tryConsentGiven",
            value: function(e) {
                var t = this,
                    n = (e = e || {}).eventName || "documentClicked",
                    o = !0 === e.force;
                if (!this.bannerShown && !o) return this.cs.debug("consent NOT given since the banner is not shown"), !0;
                if (this.cs.options.ccpaApplies && this.cs.acknowledgeCcpa(), this.freezed && !o) return !0;
                switch (n) {
                    case "documentClicked":
                        this.documentClicked = !0, this.consentAccepted = !0;
                        break;
                    case "documentScroll":
                        this.scrollDetected = !0;
                        break;
                    case "documentMoved":
                        this.moveDetected = !0;
                        break;
                    case Ht:
                        this.consentRejected = !0;
                        break;
                    case Wt:
                    case Gt:
                        this.consentAccepted = !0
                }
                this.removeBanner(), this.cs.isConsentGiven() && !o || this.cs.consentGiven({
                    global: !0,
                    implicit: !0,
                    eventName: n
                }), this.cs.options.floatingPreferencesButtonDisplay && Q((function() {
                    var e = t.createFloatingPreferencesButton();
                    e && Bt(e)
                }), !0), this.emit("try-consent-given")
            }
        }, {
            key: "getDocHeight",
            value: function() {
                var e = window.document;
                return Math.max(Math.max(e.body.scrollHeight, e.documentElement.scrollHeight), Math.max(e.body.offsetHeight, e.documentElement.offsetHeight), Math.max(e.body.clientHeight, e.documentElement.clientHeight))
            }
        }, {
            key: "setStyle",
            value: function(e, t) {
                return Qt(e, t)
            }
        }, {
            key: "closeCPiFrame",
            value: function() {
                this.CPiFrame && this.CPiFrame.closeIFrame(!1)
            }
        }]), t
    }();
    window._iub.setStyle = Qt, window._iub.onLoadCall = function(e, t) {
        e.onload = t
    };
    var tn = {
        config: {
            level: "active"
        },
        start: function() {
            var e = this;
            "none" !== this.config.level ? this.cs.ui.once("try-consent-given", (function() {
                e.logger.debug("[IUBCS|DetachEvent] removing scroll and click event listners."), e.cs.ui.removeScrollObserver(), ue(document, "click", e.cs.ui.handlerClickOnDocument, !1), e.cs.ui.isMobile && (e.logger.debug("[IUBCS|DetachEvent] removing eventlistners for mobile devices."), ue(window, "touchend", e.cs.ui.handlerDoubleTap, !1), ue(e.cs.ui.document, "touchstart", e.cs.ui.calculateStartMovement, !1), ue(e.cs.ui.document, "touchmove", e.cs.ui.handleDocumentTouchMoved, !1))
            })) : this.logger.debug("[IUBCS|DetachEvent] Skipping install DetachEvent because level is not active")
        }
    };

    function nn(e, t) {
        return ([].slice.call(new Uint8Array(t)).join("") + e).slice(-t)
    }

    function on(e, t, n) {
        (n || "boolean" == typeof n) && (e[t] = n)
    }

    function an(e, t) {
        for (var n = 0; n < e.length; ++n)
            if (t(e[n])) return n;
        return -1
    }
    var rn = new(function() {
            function e(t) {
                var n = t.sendConsent,
                    o = t.getBannerHtml,
                    a = t.getPageUrl,
                    r = t.ConsStorage;
                i(this, e), this.sendConsent = n, this.getBannerHtml = o, this.getPageUrl = a, this.ConsStorage = r, this.config = {
                    cookiePolicyId: void 0,
                    enableCcpa: void 0
                }
            }
            return r(e, [{
                key: "start",
                value: function() {
                    this.storage = new this.ConsStorage("_iub_cs_cons-".concat(this.config.cookiePolicyId)), this.cs.on("callback.before.onReady", this.onReady.bind(this)), this.cs.on("callback.before.onPreferenceFirstExpressed", this.onPreferenceFirstExpressed.bind(this))
                }
            }, {
                key: "sendPreferences",
                value: function(e, t) {
                    var n = this,
                        o = e.scoped_id;
                    this.sendConsent(this.cs.options.consApiKey, e, (function(e, i) {
                        e ? n.logger.error(e || "failed to send data to ConS server") : (i !== o && n.logger.error("ConS id mismatch. expected ".concat(o, " but received ").concat(i)), null == t || t.call(null, i))
                    }))
                }
            }, {
                key: "getCurrentPreferences",
                value: function() {
                    var e, t = this.cs.consent,
                        n = t.consent,
                        o = t.purposes,
                        i = {};
                    return on(i, "consent", n), on(i, "purposes", o), on(i, "tcfv2", this.cs.state.tcfv2String), on(i, "gac", null === (e = this.cs.customPreferences) || void 0 === e ? void 0 : e.gac), on(i, "ccpa", this.config.enableCcpa ? this.cs.getUspString() : void 0), i
                }
            }, {
                key: "getCurrentProofs",
                value: function() {
                    var e = this,
                        t = {};
                    return Object.keys(this.cs.consent).forEach((function(n) {
                        "cons" !== n && (t[n] = e.cs.consent[n])
                    })), [{
                        content: JSON.stringify(t),
                        form: this.bannerHTML
                    }]
                }
            }, {
                key: "makePayload",
                value: function() {
                    var e, t = this.cs.consent,
                        n = t.timestamp,
                        o = t.cons,
                        i = (void 0 === o ? {} : o).rand;
                    return {
                        scoped_id: function(e, t) {
                            var n = new Date(e),
                                o = nn(n.getUTCFullYear(), 4),
                                i = nn(n.getUTCMonth() + 1, 2),
                                a = nn(n.getUTCDate(), 2),
                                r = nn(n.getUTCHours(), 2),
                                s = nn(n.getUTCMinutes(), 2),
                                c = nn(n.getSeconds(), 2),
                                p = nn(n.getMilliseconds(), 3);
                            return "".concat(o, "/").concat(i, "/").concat(a, "/").concat(r, "/").concat(s, "/").concat(c, "/").concat(p, "/").concat(t)
                        }(n, void 0 === i ? (e = window.crypto || window.msCrypto, [].slice.call(e.getRandomValues(new Uint8Array(3))).map((function(e) {
                            return nn(e.toString(16), 2)
                        })).join("")) : i),
                        legal_notices: [{
                            identifier: "cookie_policy"
                        }],
                        preferences: this.getCurrentPreferences(),
                        proofs: this.getCurrentProofs(),
                        page_url: this.getPageUrl()
                    }
                }
            }, {
                key: "updateState",
                value: function(e) {
                    var t = e.id,
                        n = e.saving,
                        o = e.returnedId,
                        i = {
                            rand: t.match(/\/([A-Fa-f0-9]+)$/)[1]
                        };
                    void 0 !== n && (i.saving = n), t !== o && (i.returnedId = o), this.cs.consent.cons = i, this.cs.cookie.storeConsent()
                }
            }, {
                key: "handleSuccessfulSend",
                value: function(e, t, n) {
                    var o = t.storage,
                        i = t.cookie;
                    o && this.storage.remove(e), i && this.updateState({
                        id: e,
                        returnedId: n
                    })
                }
            }, {
                key: "retrySending",
                value: function() {
                    var e, t, n = this,
                        o = this.storage.items.map((function(e) {
                            return {
                                payload: e,
                                cb: function() {
                                    return n.handleSuccessfulSend(e.scoped_id, {
                                        storage: !0
                                    })
                                }
                            }
                        }));
                    if (null === (e = this.cs.consent) || void 0 === e || null === (t = e.cons) || void 0 === t ? void 0 : t.saving) {
                        var i = this.makePayload(),
                            a = i.scoped_id,
                            r = o.find((function(e) {
                                return e.payload.scoped_id === a
                            }));
                        r ? r.cb = function(e) {
                            return n.handleSuccessfulSend(a, {
                                storage: !0,
                                cookie: !0
                            }, e)
                        } : o.push({
                            payload: i,
                            cb: function(e) {
                                return n.handleSuccessfulSend(a, {
                                    cookie: !0
                                }, e)
                            }
                        })
                    }
                    o.forEach((function(e) {
                        var t = e.payload,
                            o = e.cb;
                        return n.sendPreferences(t, o)
                    }))
                }
            }, {
                key: "onReady",
                value: function() {
                    this.cs.options.consApiKey && (this.bannerHTML = this.getBannerHtml(), this.retrySending())
                }
            }, {
                key: "onPreferenceFirstExpressed",
                value: function() {
                    var e = this;
                    if (this.cs.options.consApiKey) {
                        var t = this.makePayload(),
                            n = t.scoped_id;
                        this.updateState({
                            id: n,
                            saving: !0
                        }), this.storage.add(t), this.sendPreferences(t, (function(t) {
                            e.handleSuccessfulSend(n, {
                                storage: !0,
                                cookie: !0
                            }, t)
                        }))
                    }
                }
            }]), e
        }())({
            sendConsent: function(e, t, n) {
                function o(e) {
                    var t = e.err,
                        o = e.response,
                        i = e.status;
                    if (t) n(t);
                    else if (i < 200 || i > 299) try {
                        var a = JSON.parse(o).message;
                        n(a)
                    } catch (e) {
                        n("Failed to decode the response from ConS server")
                    } else n(null, o)
                }
                var i = "".concat("https://consent.iubenda.com/big_data/consent", "?apikey=").concat(e),
                    a = JSON.stringify(t);
                "function" == typeof window.fetch ? function(e, t, n) {
                    var o;
                    fetch(e, {
                        method: "POST",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        body: t,
                        keepalive: !0
                    }).then((function(e) {
                        return o = e.status, e.text()
                    })).then((function(e) {
                        return n({
                            response: e,
                            status: o
                        })
                    })).catch((function(e) {
                        return n({
                            err: e.toString()
                        })
                    }))
                }(i, a, o) : function(e, t, n) {
                    var o = new XMLHttpRequest;
                    o.onload = function() {
                        return n({
                            response: o.responseText,
                            status: o.status
                        })
                    }, o.onerror = function() {
                        return n({
                            err: "Failed to send data to ConS server"
                        })
                    }, o.open("POST", e), o.setRequestHeader("Content-Type", "text/plain"), o.send(t)
                }(i, a, o)
            },
            getBannerHtml: function() {
                var e, t;
                return null !== (e = null === (t = document.getElementById("iubenda-cs-banner")) || void 0 === t ? void 0 : t.innerHTML) && void 0 !== e ? e : "Couldn't retrieve banner HTML"
            },
            getPageUrl: function() {
                return location.href
            },
            ConsStorage: function() {
                function e(t) {
                    i(this, e), this.storageKey = t
                }
                return r(e, [{
                    key: "add",
                    value: function(e) {
                        var t = this.items,
                            n = an(t, (function(t) {
                                return t.scoped_id === e.scoped_id
                            })); - 1 !== n ? t[n] = e : t.push(e), this.items = t
                    }
                }, {
                    key: "remove",
                    value: function(e) {
                        var t = this.items,
                            n = an(t, (function(t) {
                                return t.scoped_id === e
                            })); - 1 !== n && t.splice(n, 1), this.items = t
                    }
                }, {
                    key: "items",
                    get: function() {
                        var e;
                        try {
                            e = JSON.parse(localStorage.getItem(this.storageKey))
                        } catch (e) {}
                        return e || []
                    },
                    set: function(e) {
                        try {
                            0 === e.length ? localStorage.removeItem(this.storageKey) : localStorage.setItem(this.storageKey, JSON.stringify(e))
                        } catch (e) {}
                    }
                }]), e
            }()
        }),
        sn = function() {},
        cn = new(function() {
            function e() {
                i(this, e), this._registry = {}, this._instances = {}
            }
            return r(e, [{
                key: "register",
                value: function(e, t) {
                    t.install = t.install || sn, this._registry[e] = t
                }
            }, {
                key: "createPluginInstance",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        o = arguments.length > 3 ? arguments[3] : void 0,
                        i = this._registry,
                        a = i[e];
                    if (!a) return null;
                    var r = {};
                    v(r, a), Object.setPrototypeOf(r, Object.getPrototypeOf(a)), r.cs = t, r.logger = o, r.config = r.config || {};
                    var s = {};
                    return Object.keys(n).forEach((function(e) {
                        r.config.hasOwnProperty(e) && (s[e] = n[e])
                    })), v(r.config, s), r
                }
            }, {
                key: "install",
                value: function(e, t, n) {
                    var o = this,
                        i = this._registry,
                        a = this._instances;
                    Object.keys(i).forEach((function(i) {
                        var r = o.createPluginInstance(i, e, t, n);
                        a[i] = r, r.start()
                    }))
                }
            }, {
                key: "get",
                value: function(e) {
                    return this._registry[e]
                }
            }]), e
        }());
    cn.register("googleConsentMode", S), cn.register("ensureActivation", me), cn.register("detachEventAfterFirstConsent", tn), cn.register("ConS_integration", rn);
    var pn = Date.UTC(2020, 6, 28) <= Date.now(),
        ln = {};
    !1 === _iub.csConfigLegacy && (ln = {
        inlineDelay: 500,
        startOnDomReady: !0,
        safeTimeout: 0
    });
    var un = n({
        logger: "console",
        logLevel: "nolog",
        raiseOnException: !1,
        cookiePolicyId: null,
        siteId: null,
        priorConsent: !0,
        cookiePolicyUrl: null,
        cookiePolicyInOtherWindow: !1,
        skipSaveConsent: !1,
        lang: "it",
        startOnDomReady: !1,
        countryDetection: !1,
        askConsentAtCookiePolicyUpdate: !1,
        invalidateConsentBefore: null,
        invalidateConsentWithoutLog: Date.UTC(2023, 0, 15) <= Date.now(),
        banner: {
            content: null,
            cookiePolicyLinkCaption: null,
            zIndex: 99999998,
            backgroundColor: "#000",
            textColor: "#fff",
            fontSize: null,
            fontSizeCloseButton: "20px",
            fontSizeBody: "14px",
            applyStyles: !0,
            html: null,
            slideDown: !0,
            consentOnScrollDelay: 500,
            prependOnBody: !1,
            position: "top",
            backgroundOverlay: !1,
            acceptButtonDisplay: !1,
            acceptButtonCaption: null,
            acceptButtonColor: null,
            acceptButtonCaptionColor: null,
            customizeButtonDisplay: !1,
            customizeButtonCaption: null,
            customizeButtonColor: null,
            customizeButtonCaptionColor: null,
            rejectButtonDisplay: !1,
            rejectButtonCaption: null,
            rejectButtonColor: null,
            rejectButtonCaptionColor: null,
            continueWithoutAcceptingButtonDisplay: !1,
            continueWithoutAcceptingButtonCaption: null,
            continueWithoutAcceptingButtonColor: null,
            continueWithoutAcceptingButtonCaptionColor: null,
            closeButtonDisplay: !0,
            closeButtonCaption: "&times;",
            closeButtonRejects: !1,
            logo: "",
            brandBackgroundColor: "#000",
            brandTextColor: "#fff",
            listPurposes: !1,
            explicitWithdrawal: !1,
            useThirdParties: !0
        },
        rebuildIframe: !0,
        footer: {
            message: null,
            btnCaption: null
        },
        callback: {
            onBeforePreload: null,
            onReady: null,
            onStartupFailed: null,
            onError: null,
            onFatalError: null,
            onBannerShown: null,
            onBannerClosed: null,
            onCookiePolicyShown: null,
            onConsentFirstGiven: null,
            onConsentGiven: null,
            onConsentRead: null,
            onActivationDone: null,
            onPreferenceNotNeeded: null,
            onConsentFirstRejected: null,
            onConsentRejected: null,
            onPreferenceFirstExpressed: null,
            onPreferenceExpressed: null,
            onPreferenceExpressedOrNotNeeded: null,
            onCcpaAcknowledged: null,
            onCcpaOptOut: null,
            onCcpaFirstAcknowledged: null,
            onCcpaFirstOptOut: null,
            on2ndLayerShown: null,
            on2ndLayerClosed: null
        },
        preferenceCookie: {
            expireAfter: 365,
            tcfV2Name: "euconsent-v2"
        },
        enableRemoteConsent: !1,
        loopbackServer: {
            iframeBridge: {
                host: "cdn.iubenda.com",
                iframePath: "/cs/bridge/iframe_bridge-1.5.0.html"
            },
            callback: {
                host: "www.iubenda.com",
                setRemoteCookiePath: "/cookie-consent/cookies/set",
                resetRemoteCookiePath: "/cookie-consent/cookies/reset",
                getRemoteCookiePath: "/cookie-consent/cookies/get"
            }
        },
        consentOnContinuedBrowsing: !0,
        consentOnLinkAndButton: !0,
        consentOnElement: "input, textarea, form",
        consentOnDocument: !1,
        consentOnScroll: !0,
        consentOnScrollHorizontal: !1,
        consentOnScrollOnElement: null,
        hideInIframe: !1,
        reloadOnConsent: !1,
        localConsentDomain: null,
        localConsentPath: "/",
        inlineDelay: 1e3,
        safeTimeout: 5e3,
        forceSafeActivation: !1,
        enableTcf: !1,
        tcfVersion: pn ? 2 : 1,
        askConsentIfCMPNotFound: !0,
        gdprApplies: void 0,
        gdprAppliesGlobally: !0,
        googleAdsPreferenceManagement: !1,
        googleAdditionalConsentMode: !1,
        newConsentAtVendorListUpdate: null,
        i18n: {},
        whitelabel: !0,
        perPurposeConsent: !1,
        showPurposesCollapsed: !0,
        promptToAcceptOnBlockedElements: !1,
        purposes: null,
        dynamicBannerText: !0,
        maxCookieSize: 4096,
        maxCookieChunks: 5,
        enableGdpr: !0,
        enableCcpa: !1,
        ccpaAppliesToEntireUSA: !1,
        ccpaApplies: void 0,
        ccpaAcknowledgeOnDisplay: !1,
        ccpaAcknowledgeOnLoad: !1,
        ccpaNoticeDisplay: !0,
        ccpaLspa: void 0,
        ccpaCookie: {
            expireAfter: 365
        },
        privacyPolicyUrl: void 0,
        enableLgpd: !1,
        lgpdApplies: void 0,
        lgpdAppliesGlobally: !0,
        floatingPreferencesButtonDisplay: !1,
        floatingPreferencesButtonForceDisplay: !1,
        floatingPreferencesButtonCaption: !1,
        floatingPreferencesButtonColor: "",
        floatingPreferencesButtonCaptionColor: "",
        floatingPreferencesButtonHover: !1,
        floatingPreferencesButtonIcon: !0,
        floatingPreferencesButtonRound: !1,
        tcfPurposes: {},
        LIRestricted: !1,
        tcfPublisherCC: null,
        skipTcfValidation: !1,
        googleConsentMode: void 0,
        consApiKey: void 0,
        hasCookiePolicy: void 0,
        hasPrivacyPolicy: void 0,
        floatingPreferencesButtonZIndex: 2147483647
    }, ln);

    function dn(e, t, n) {
        var o = e.cs,
            i = e.cs.options,
            a = e.cs.settings.urlForRemoteConf.replace("%{cookie_policy_id}", i.cookiePolicyId);
        o.info("Loading remote configurations."), o.info("Loading configuration through javascript file."),
            function(e, t) {
                var n = document.createElement("script");
                n.async = !0, n.onload = function() {
                    return t({
                        success: !0
                    })
                }, n.onerror = function() {
                    return t({
                        success: !1
                    })
                }, n.src = e;
                var o = document.getElementsByTagName("script")[0];
                o.parentNode.insertBefore(n, o)
            }(a, (function(i) {
                if (i.success) o.info("Remote configuration correctly loaded."), o.info("Merging remote configuration with default."), e.csPurposes = e.csPurposes || [], a = e.csPurposes, r = 4, s = 6, c = 7, p = -1 === a.indexOf(r), l = -1 !== a.indexOf(s), u = -1 !== a.indexOf(c), p && (l || u) && a.push(r), void 0 === e.csEnabled ? (o.warn("Remote configuration NOT correctly loaded: Iubenda Cookie Solution enabled without Priorconsent."), e.csEnabled = o.state.enabled = !1) : o.state.enabled = e.csEnabled, o.setRemoteConfiguration(e.csRC), null == n || n.call();
                else {
                    t("Something went wrong within loading remote configuration.")
                }
                var a, r, s, c, p, l, u
            }))
    }
    var hn, mn, bn, fn, gn = null,
        vn = function() {
            function t(n, o, a, r, s) {
                i(this, t), gn = s, this.i18nForBanner = r || e;
                var c = Date.UTC(2020, 7, 11) <= Date.now();
                this.RENAMED_OPTIONS = {
                    consentOnButton: "consentOnLinkAndButton",
                    enableCMP: "enableTcf",
                    "banner.innerHtmlCloseBtn": "banner.closeButtonCaption"
                }, o = o || {}, a = v({
                    fromRemoteConf: !1,
                    floatingPreferencesButtonDisplaySpecified: !1
                }, a), o.lang && !this.isLanguageSupported(o.lang) && (o.i18n && o.i18n[o.lang] && v(this.i18nForBanner.en, o.i18n[o.lang]), o.lang = "en"), 2 !== o.tcfVersion && c && (o.tcfVersion = 2), v(this, n), v(this, o), v(this, this.getRenamedOptions(o, this.RENAMED_OPTIONS)), this.setConfiguredI18n(), this.logDeprecatedOptionWarning(o, this.RENAMED_OPTIONS), this.forceConsentOnContinuedBrowsingIfNeeded(), this.adjustSettingsForExplicitConsent(), this.forceCustomizeButtonDisplayIfNeeded(), this.setContinueWithoutAccepting(), this.forceCloseButtonDisplayIfNeeded(), this.setTranslationLanguage(), this.setGdprApplies(), this.setLgpdApplies(), this.setPriorConsent(), this.resetRemoteConfOptions(a), this.setTcfOptions(a), this.setGoogleAdditionalConsentMode(), this.setCcpaApplies(), this.setAcceptButtonCaption(), this.setRejectButtonCaption(), this.setExplicitWithdrawal(), this.setShowPurposesCollapsed(), a.fromRemoteConf && (this.setHasCookiePolicy(), this.setHasPrivacyPolicy(), this.setPerPurposeConsent(), this.hasPrivacyPolicy && !this.privacyPolicyUrl && (this.privacyPolicyUrl = "https://www.iubenda.com/privacy-policy/" + this.cookiePolicyId + "/legal?an=no&s_ck=false&newmarkup=yes")), this.ccpaCookie && this.ccpaCookie.expireAfter && this.ccpaCookie.expireAfter < 365 && (this.ccpaCookie.expireAfter = 365), this.disableGdprOptionsIfNeeded(), this.setInvalidateConsentBefore(a)
            }
            return r(t, [{
                key: "setHasCookiePolicy",
                value: function() {
                    void 0 === this.hasCookiePolicy && (this.hasCookiePolicy = !!this.cookiePolicyUrl || !!_iub.cpUpd)
                }
            }, {
                key: "setHasPrivacyPolicy",
                value: function() {
                    void 0 === this.hasPrivacyPolicy && (this.hasPrivacyPolicy = !!this.privacyPolicyUrl || !!_iub.ppUpd || !!_iub.cpUpd)
                }
            }, {
                key: "setPerPurposeConsent",
                value: function() {
                    this.hasCookiePolicy || (this.perPurposeConsent = !0)
                }
            }, {
                key: "setInvalidateConsentBefore",
                value: function(e) {
                    if (this.invalidateConsentBefore && (this.invalidateConsentBefore = new Date(this.invalidateConsentBefore).getTime()), e.fromRemoteConf && this.askConsentAtCookiePolicyUpdate && void 0 !== _iub.cpUpd) {
                        var t = new Date(1e3 * _iub.cpUpd).getTime();
                        this.invalidateConsentBefore = Math.max(this.invalidateConsentBefore || 0, t)
                    }
                }
            }, {
                key: "setTcfOptions",
                value: function(e) {
                    if (this.enableTcf && 1 !== this.tcfVersion) {
                        this.googleAdsPreferenceManagement = !1, this.setTcfValidationOptions(e), this.enableTcf = !0;
                        var t = this.tcfPurposes,
                            n = this.i18nForBanner[this.lang].tcf_v2.purposes,
                            o = !1;
                        Object.keys(n).forEach((function(e) {
                            e in t ? "1" === e || "li_only" !== t[e] && !0 !== t[e] || (o = !0) : t[e] = !0
                        })), this.LIRestricted = !o
                    }
                }
            }, {
                key: "setTcfValidationOptions",
                value: function(e) {
                    if (!this.skipTcfValidation && e.fromRemoteConf && (this.banner.content = null, this.banner.acceptButtonDisplay = !0, this.banner.customizeButtonDisplay = !0, this.banner.html)) {
                        var t = document.createElement("div");
                        t.innerHTML = this.banner.html;
                        var n = /\%\{banner_content\}/.test(this.banner.html),
                            o = t.querySelectorAll(".iubenda-cs-accept-btn").length > 0,
                            i = t.querySelectorAll(".iubenda-cs-customize-btn").length > 0;
                        n && o && i || (gn.log("warn", "banner.html changed to default since it doesn't respect the TCF requirements"), this.banner.html = null)
                    }
                }
            }, {
                key: "setGoogleAdditionalConsentMode",
                value: function() {
                    this.enableTcf && 1 !== this.tcfVersion || (this.googleAdditionalConsentMode = !1)
                }
            }, {
                key: "resetRemoteConfOptions",
                value: function(e) {
                    e.fromRemoteConf || (this.skipTcfValidation = !1, this.consApiKey = void 0)
                }
            }, {
                key: "forceConsentOnContinuedBrowsingIfNeeded",
                value: function() {
                    Date.UTC(2022, 10, 21) <= Date.now() && (this.consentOnContinuedBrowsing = !1, this.banner.acceptButtonDisplay || this.banner.closeButtonDisplay || (this.banner.acceptButtonDisplay = !0))
                }
            }, {
                key: "forceCustomizeButtonDisplayIfNeeded",
                value: function() {
                    this.perPurposeConsent && this.banner && (this.banner.customizeButtonDisplay = !0)
                }
            }, {
                key: "forceCloseButtonDisplayIfNeeded",
                value: function() {
                    var e = this.banner,
                        t = e.acceptButtonDisplay,
                        n = e.rejectButtonDisplay,
                        o = e.closeButtonRejects,
                        i = e.continueWithoutAcceptingButtonDisplay;
                    (t && n && !o || i) && (this.banner.closeButtonDisplay = !1)
                }
            }, {
                key: "setTranslationLanguage",
                value: function() {
                    this.lang && ke.setLang(this.lang)
                }
            }, {
                key: "setGdprApplies",
                value: function() {
                    if (!this.enableGdpr) return this.gdprAppliesGlobally = !1, void(this.gdprApplies = !1);
                    if (this.gdprAppliesGlobally) return gn.info("Setting gdprApplies=true since gdprAppliesGlobally is true"), void(this.gdprApplies = !0);
                    if (void 0 === this.gdprApplies) {
                        if (!this.gdprAppliesGlobally && this.countryDetection && "EU" !== _iub.cc) return gn.info("Setting gdprApplies=false since countryDetection is true and user is detected from outside EU (" + _iub.cc + ")."), void(this.gdprApplies = !1);
                        gn.info("Setting gdprApplies=true by default"), this.gdprApplies = !0
                    }
                }
            }, {
                key: "setLgpdApplies",
                value: function() {
                    if (!this.enableLgpd) return this.lgpdAppliesGlobally = !1, void(this.lgpdApplies = !1);
                    if (void 0 === this.lgpdApplies) {
                        if (!this.lgpdAppliesGlobally && this.countryDetection && "BR" !== _iub.cc) return gn.info("Setting lgpdApplies=false since countryDetection is true and user is detected from outside BR (" + _iub.cc + ")."), void(this.lgpdApplies = !1);
                        gn.info("Setting lgpdApplies=true by default"), this.lgpdApplies = !0
                    }
                }
            }, {
                key: "setCcpaApplies",
                value: function() {
                    this.enableCcpa && void 0 === this.ccpaApplies && (this.countryDetection && "US-CA" !== _iub.cc ? this.ccpaAppliesToEntireUSA && /^US/.test(_iub.cc) && (this.ccpaApplies = !0) : this.ccpaApplies = !0)
                }
            }, {
                key: "setExplicitWithdrawal",
                value: function() {
                    this.enableTcf && (this.banner.explicitWithdrawal = !0)
                }
            }, {
                key: "setShowPurposesCollapsed",
                value: function() {
                    this.lgpdApplies && (this.showPurposesCollapsed = !1)
                }
            }, {
                key: "setAcceptButtonCaption",
                value: function() {
                    this.banner.acceptButtonCaption || (this.banner.acceptButtonCaption = ke("banner.accept_button_caption"))
                }
            }, {
                key: "setRejectButtonCaption",
                value: function() {
                    this.banner.rejectButtonCaption || (this.banner.rejectButtonCaption = ke("banner.reject_button_caption"))
                }
            }, {
                key: "setContinueWithoutAccepting",
                value: function() {
                    if (this.consentOnScroll || this.consentOnLinkAndButton || this.consentOnElement || this.consentOnContinuedBrowsing || this.consentOnScrollHorizontal || this.consentOnDocument) this.banner.continueWithoutAcceptingButtonDisplay = !1;
                    else {
                        var e = this.banner,
                            t = e.continueWithoutAcceptingButtonDisplay,
                            n = e.continueWithoutAcceptingButtonCaption;
                        t && (this.banner.closeButtonRejects = !0, n || (this.banner.continueWithoutAcceptingButtonCaption = ke("banner.continue_acception_button_caption")))
                    }
                }
            }, {
                key: "disableGdprOptionsIfNeeded",
                value: function() {
                    this.gdprApplies || this.lgpdApplies || !this.banner || (this.banner.acceptButtonDisplay = !1, this.banner.rejectButtonDisplay = !1, this.banner.customizeButtonDisplay = !1, this.banner.closeButtonDisplay = !0, this.banner.closeButtonRejects = !1, this.banner.closeButtonCaption = "&times;")
                }
            }, {
                key: "setPriorConsent",
                value: function() {
                    this.gdprApplies || this.lgpdApplies || (this.priorConsent = !1)
                }
            }, {
                key: "setConfiguredI18n",
                value: function() {
                    this.i18n && v(this.i18nForBanner, this.i18n)
                }
            }, {
                key: "isLanguageSupported",
                value: function(e) {
                    return "string" == typeof e && this.i18nForBanner.hasOwnProperty(e)
                }
            }, {
                key: "get",
                value: function(e, t) {
                    return function(e, t, n) {
                        if (!t) return e;
                        for (var i, a = t.split("."), r = e, s = 0; s < a.length; s++) {
                            var c = a[s];
                            if (s === a.length - 1) {
                                i = r[c];
                                break
                            }
                            if ("object" !== o(r[c]) || !r[c]) {
                                i = void 0;
                                break
                            }
                            r = r[c]
                        }
                        return i || !1 === i ? i : n
                    }(this, e, t)
                }
            }, {
                key: "check",
                value: function(e, t) {
                    var n = this;
                    Object.keys(t).forEach((function(i) {
                        t[i] instanceof HTMLElement ? void 0 !== e[i] ? e[i] = t[i] : gn.warn("".concat("configuration option ", i.toUpperCase(), " [", t[i], "] NOT recognized")) : "object" === o(t[i]) || void 0 === t[i] ? "object" === o(e[i]) ? "object" === o(t[i]) && null !== t[i] ? Object.keys(t[i]).forEach((function(o) {
                            void 0 !== e[i][o] || void 0 !== n.RENAMED_OPTIONS["".concat(i, ".").concat(o)] ? e[i][o] = t[i][o] : gn.warn("".concat("configuration option ", i.toUpperCase(), ".", o.toUpperCase(), " [", t[i][o], "] NOT recognized"))
                        })) : e[i] = t[i] : void 0 === e[i] ? e[i] = t[i] : gn.warn("".concat("configuration option ", i.toUpperCase(), " [", t[i], "] MISMATCH")) : null !== e[i] && "object" === o(e[i]) ? gn.warn("".concat("configuration option ", i.toUpperCase(), " [", t[i], "] MISMATCH")) : void 0 !== e[i] || void 0 !== n.RENAMED_OPTIONS[i] ? e[i] = t[i] : gn.warn("".concat("configuration option ", i.toUpperCase(), " [", t[i], "] NOT recognized"))
                    }))
                }
            }, {
                key: "adjustSettingsForExplicitConsent",
                value: function() {
                    !1 === this.consentOnContinuedBrowsing && (this.consentOnContinuedBrowsing = !1, this.consentOnDocument = !1, this.consentOnLinkAndButton = !1, this.consentOnScroll = !1, this.consentOnScrollHorizontal = !1, this.consentOnElement = "", this.consentOnScrollOnElement = "")
                }
            }, {
                key: "getObjValueByPath",
                value: function(e, t) {
                    for (var n, o = e, i = t.split("."), a = 0; a < i.length; a++) {
                        var r = i[a];
                        if (a === i.length - 1) o && void 0 !== o[r] && (n = o[r]);
                        else {
                            if (!o[r]) break;
                            o = o[r]
                        }
                    }
                    return n
                }
            }, {
                key: "setObjValueByPath",
                value: function(e, t, n) {
                    var o = e,
                        i = t.split(".");
                    return i.forEach((function(e, t) {
                        t === i.length - 1 ? o[e] = n : (o[e] || (o[e] = {}), o = o[e])
                    })), o
                }
            }, {
                key: "getRenamedOptions",
                value: function(e, t) {
                    var n = this;
                    return Object.keys(t).reduce((function(o, i) {
                        var a = t[i],
                            r = n.getObjValueByPath(e, a),
                            s = n.getObjValueByPath(e, i),
                            c = void 0 !== r ? r : s;
                        return void 0 === c || (n.setObjValueByPath(o, a, c), n.setObjValueByPath(o, i, c)), o
                    }), {})
                }
            }, {
                key: "logDeprecatedOptionWarning",
                value: function(e, t) {
                    var n = this;
                    Object.keys(t).forEach((function(o) {
                        var i = t[o];
                        n.getObjValueByPath(e, o) && gn.warn("deprecated parameter [" + o + "], use [" + i + "] instead")
                    }))
                }
            }]), t
        }(),
        yn = function e(t, n, o) {
            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            i >= n.length ? o && o() : t(n[i], (function() {
                e(t, n, o, i + 1)
            }))
        },
        kn = function() {
            function e(t) {
                i(this, e), this.purposes = t
            }
            return r(e, [{
                key: "size",
                value: function() {
                    return Object.keys(this.purposes).length
                }
            }, {
                key: "hasPurpose",
                value: function(e) {
                    return void 0 !== this.purposes[e]
                }
            }, {
                key: "getPurposeIDByName",
                value: function(e) {
                    var t = this;
                    return Object.keys(this.purposes).filter((function(n) {
                        return t.purposes[n] === e
                    }))[0] || null
                }
            }, {
                key: "getPurposeNameByID",
                value: function(e) {
                    return this.purposes[e] || null
                }
            }, {
                key: "toIDArray",
                value: function() {
                    return Object.keys(this.purposes)
                }
            }]), e
        }(),
        Cn = new kn({
            1: "necessary",
            2: "basic",
            3: "enhancement",
            4: "analytics",
            5: "advertising"
        });
    kn.fromList = function(e) {
        for (var t = e.split(","), n = {}, o = 0, i = t.length; o < i; ++o) {
            var a = t[o].trim(),
                r = parseInt(a, 10);
            if (a)
                if (isNaN(r)) {
                    var s = Cn.getPurposeIDByName(a);
                    s && (n[s] = a)
                } else {
                    Cn.getPurposeNameByID(r) && (n[r] = Cn.getPurposeNameByID(r))
                }
        }
        return new kn(n)
    }, kn.allPurposes = Cn;
    var wn, xn = null !== (hn = null === (mn = _iub.csConfiguration) || void 0 === mn ? void 0 : mn.rebuildIframe) && void 0 !== hn ? hn : un.rebuildIframe,
        Pn = null !== (bn = null === (fn = _iub.csConfiguration) || void 0 === fn ? void 0 : fn.inlineDelay) && void 0 !== bn ? bn : un.inlineDelay,
        _n = ["_iub_cs_activate-inline", "_iub_cs_activate", "_iub_cs_activate_iframe", "_iub_cs_activate_notused"],
        An = "_iub_cs_activate-activated",
        Bn = "_iub_cs_activate-overlay",
        Sn = "data-iub-purposes",
        On = document.write,
        Tn = document.writeln;

    function En(e, t) {
        var n = t.addRef,
            o = t.removeRef,
            i = e.parentNode,
            a = e.nextSibling,
            r = "",
            s = i,
            p = null,
            l = function() {
                var e = document.implementation.createHTMLDocument("");
                return e.open(), e.write("<html><head></head><body>"), e
            }(),
            u = J(l.body);
        u.reiterate(), u.next();
        var d = l.body;

        function h(e) {
            var t = /(\<[\n\s]*\/[\n\s]*script[\n\s]*>)/gi,
                h = r + e,
                m = [];
            t.lastIndex = r.length;
            for (var b = t.lastIndex; t.exec(h);) {
                var f = t.lastIndex;
                m.push({
                    chunk: h.substring(b, f),
                    lastNodeIsScript: !0
                }), b = f
            }
            var g = h.substring(b);
            g && m.push({
                chunk: g,
                lastNodeIsScript: !1
            }), m.forEach((function(e) {
                var t = e.chunk,
                    h = e.lastNodeIsScript;
                r += t,
                    function(e, t) {
                        l.write(e), u.reiterate();
                        var r, h = function(e) {
                            for (var t = e; t.childNodes.length;) t = t.childNodes[t.childNodes.length - 1];
                            return t
                        }(l.body);
                        if (p && (p.nodeValue = d.nodeValue), h !== d || t)
                            for (d = h;;) {
                                var m = c(u.next().value, 2),
                                    b = m[0],
                                    f = m[1];
                                if (f)
                                    if ("enter" === b) {
                                        var g = f.cloneNode(!1);
                                        g.nodeType === Node.ELEMENT_NODE && K(g) && ((r = g).hasAttribute("type") && r.setAttribute("data-iub-type", r.getAttribute("type")), r.setAttribute("type", "text/plain"), r.setAttribute("data-iub-script", "true"));
                                        var v = s === i ? a : null;
                                        if (s.insertBefore(g, v), g.nodeType === Node.ELEMENT_NODE && (s = g), p = g.nodeType === Node.TEXT_NODE ? g : null, !t && f === h) break
                                    } else if (p = null, f.nodeType === Node.ELEMENT_NODE) {
                                    if (K(s)) {
                                        var y = s,
                                            k = document.createElement("script");
                                        $(k, $(y)), Z(k), k.appendChild(document.createTextNode(y.innerHTML)), k.hasAttribute("src") && (k.async = !1, k.addEventListener("load", (function() {
                                            return o()
                                        })), k.addEventListener("error", (function() {
                                            return o()
                                        })), n()), s = y.parentNode, y.parentNode.replaceChild(k, y);
                                        break
                                    }
                                    s = s.parentNode
                                }
                            }
                    }(t, h)
            }))
        }
        document.write = h, document.writeln = function(e) {
            return h(e + "\n")
        }
    }

    function Nn(e) {
        return e.getAttribute("data-suppressedsrc") || e.getAttribute("suppressedsrc") || e.getAttribute("src")
    }

    function Ln(e, t) {
        if (!e.src) return t(null, e);
        var n = "onreadystatechange",
            o = e.onload,
            i = e.onerror,
            a = e.onreadystatechange;

        function r(n, r) {
            if (e.onload = o, e.onerror = i, e.onreadystatechange = a, e[n]) try {
                e[n].apply(e, r)
            } catch (e) {
                console.error(e)
            }!e.readyState || /^c|loade/.test(e.readyState) ? t(null, e) : s()
        }

        function s() {
            e.onload = function() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                r("onload", t)
            }, e.onerror = function() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                r("onerror", t)
            }, e.onreadystatechange = function() {
                for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                r(n, t)
            }
        }
        s()
    }
    var In = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Dn(e, t) {
        var n = Nn(e),
            o = e.text || e.textContent || e.innerHTML || "";
        o = o.replace(In, "");
        var i = $(e),
            a = i.suppressedtype || i["data-iub-type"] || "text/javascript";
        delete i["data-suppressedsrc"], delete i.suppressedsrc, delete i.type, delete i.src, delete i.suppressedtype, delete i["data-iub-type"], i.async = !1;
        var r = function(e, t) {
            var n = document.createElement("script");
            return n.setAttribute("type", "text/javascript"), e && n.setAttribute("src", e), "string" == typeof t && (n.text = t), n
        }(n, o);
        if (r.setAttribute("type", a), $(r, i), te(r, An), Ln(r, t), W(document, e)) {
            var s = G("div");
            X(e, s), Y(e), q(s, r)
        } else document.body.appendChild(r)
    }

    function zn(e, t) {
        var n = e.getAttribute(Sn);
        return null !== n ? kn.fromList(n).toIDArray() : _iub.cs && _iub.cs.purposes ? _iub.cs.purposes.toIDArray() : t ? t.toIDArray() : []
    }

    function Rn(e, t) {
        var n = Nn(e),
            o = e.text || e.textContent || e.innerHTML || "";
        o = o.replace(In, "");
        var i = $(e);
        delete i["data-suppressedsrc"], delete i.suppressedsrc, delete i.type, delete i.src, i.async = !1;
        var a = G("div");
        X(e, a), Y(e);
        var r = function(e, t) {
            var n = document.createElement("iframe");
            return e && n.setAttribute("src", e), "string" == typeof t && (n.text = t), n
        }(n, o);
        $(r, i), Ln(r, t), te(r, An), q(a, r)
    }
    var Fn = function(e, t, n) {
            var o, i, a = function() {
                    s += 1
                },
                r = function() {
                    (s -= 1) <= 0 && (document.write = On, document.writeln = Tn, i && wn.error("Snippet activation failed", i, o || e), t && t(!i && o), t = c = e = null)
                },
                s = 0;
            a(), En(e, {
                addRef: a,
                removeRef: r
            });
            var c = function(e) {
                return !!e.className.match(/\b_iub_cs_activate-inline\b/)
            }(e) ? Pn : 0;
            n((function(e, t) {
                setTimeout((function() {
                    i = e, o = t, r()
                }), c)
            }))
        },
        jn = function(e, t) {
            var n = e.getAttribute("data-iub-cs-wait-for");
            if (n) var o = setInterval((function() {
                (function(e) {
                    try {
                        return eval.call(window, e)
                    } catch (e) {
                        return !1
                    }
                })(n) && (clearInterval(o), t())
            }), 100);
            else t()
        },
        Mn = 0,
        Vn = 1,
        Un = 2,
        Hn = function() {
            function e(t) {
                i(this, e), wn = t, at(this)
            }
            return r(e, [{
                key: "activateSnippet",
                value: function(e, t) {
                    var n = this;
                    Fn(e, t, (function(t) {
                        jn(e, (function() {
                            ! function(e, t) {
                                try {
                                    if (V(e, "script")) Dn(e, t);
                                    else if (V(e, "iframe") && xn) Rn(e, t);
                                    else {
                                        var n = Nn(e);
                                        e.removeAttribute("type"), e.removeAttribute("suppressedsrc"), e.src = n, t(null, e)
                                    }
                                } catch (e) {
                                    t(e)
                                }
                            }(e, (function(e, o) {
                                n.emit("snippet-activated", o), t(e, o)
                            }))
                        }))
                    }))
                }
            }, {
                key: "insertOverlay",
                value: function(e, t, n, o) {
                    var i = this,
                        a = zn(n, t.purposesPreference),
                        r = function t() {
                            n.removeEventListener("load", t), n.contentDocument.open(), n.contentDocument.write(e(_iub.cs.options.lang, a)), n.contentDocument.close(), n.contentDocument.querySelector(".iubenda-cs__preferences-link").addEventListener("click", (function() {
                                _iub.cs.api.openPreferences({
                                    acceptPurposes: a
                                })
                            })), i.emit("overlay-inserted", n), o()
                        };
                    if ("about:blank" === n.src) r();
                    else {
                        if (xn) {
                            var s = document.createElement("iframe");
                            $(s, $(n)), n.parentNode.replaceChild(s, n), n = s
                        }
                        n.classList.add(Bn), n.src = "about:blank", n.addEventListener("load", r)
                    }
                }
            }, {
                key: "activateSnippets",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
                    this.emit("before-activate-snippets", e), wn.debug("Running activateSnippets on", e.length, "elems"), yn(this.activateSnippet.bind(this), e, t)
                }
            }, {
                key: "insertOverlays",
                value: function(e, t, n) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {};
                    e ? (wn.debug("Running insertOverlays on", n.length, "elems"), yn(this.insertOverlay.bind(this, e, t), n, o)) : o()
                }
            }, {
                key: "activateAllSnippets",
                value: function(e) {
                    var t = this,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        o = arguments.length > 2 ? arguments[2] : void 0,
                        i = arguments.length > 3 ? arguments[3] : void 0;
                    wn.debug("Running activateAllSnippets");
                    var a = H(_n),
                        r = a.filter((function(e) {
                            return t.getElementActivationStatus(e, n, o, i) === Vn
                        })),
                        s = a.filter((function(e) {
                            return t.getElementActivationStatus(e, n, o, i) === Un && "IFRAME" === e.nodeName && !e.classList.contains(Bn)
                        })),
                        c = n.promptToAcceptOnBlockedElements && n.perPurposeConsent ? s : [],
                        p = n.renderOverlay ? function(e, t) {
                            return n.renderOverlay(e, t, {
                                styleOptions: n.banner
                            })
                        } : null;
                    this.activateSnippets(r, (function() {
                        t.insertOverlays(p, o, c, (function() {
                            wn.debug("activateAllSnippets done, calling done callback..."), t.emit("all-snippets-activated"), e && e()
                        }))
                    }))
                }
            }, {
                key: "activateOnDomReady",
                value: function(e, t, n, o) {
                    var i = this;
                    Q((function() {
                        i.activateAllSnippets(e, t, n, o)
                    }), !0)
                }
            }, {
                key: "getElementActivationStatus",
                value: function(e, t, n, o) {
                    if (oe(e, An)) return Mn;
                    if (this.isNecessaryPurpose(e)) return Vn;
                    if (o && this.shouldElementBeBlockedForCcpa(e)) return Un;
                    if (!1 === t.gdprApplies && !1 === t.lgpdApplies) return Vn;
                    var i = this.purposesPreferenceIsNotEmpty(n.purposesPreference) && function(e, t) {
                        var n = zn(e, t);
                        return t.hasApproved(n)
                    }(e, n.purposesPreference);
                    return t.perPurposeConsent && !i ? Un : t.perPurposeConsent || n.consent ? Vn : Un
                }
            }, {
                key: "shouldElementBeBlockedForCcpa",
                value: function(e) {
                    var t = e.getAttribute("data-iub-blockifccpaoptout");
                    return null !== t && "false" !== t.toLowerCase()
                }
            }, {
                key: "purposesPreferenceIsNotEmpty",
                value: function(e) {
                    return !(!e || !Object.keys(e.preferences).length)
                }
            }, {
                key: "isNecessaryPurpose",
                value: function(e) {
                    return 1 === Number(e.getAttribute(Sn)) || "neccessary" === e.getAttribute(Sn)
                }
            }]), e
        }();
    _iub.csActivator = new Hn(wn);
    var Wn = function(e) {
            var t = new Date(e);
            return Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate())
        },
        Gn = function() {
            function e() {
                i(this, e), this.preferences = {}, this.savedPreferencesState = {}
            }
            return r(e, [{
                key: "size",
                value: function() {
                    return Object.keys(this.preferences).length
                }
            }, {
                key: "setPreference",
                value: function(e, t) {
                    this.preferences[e] = t
                }
            }, {
                key: "getPreferenceByPurposeID",
                value: function(e) {
                    return this.preferences[e] || null
                }
            }, {
                key: "hasGivenPreference",
                value: function(e) {
                    var t = this;
                    return !e.filter((function(e) {
                        return void 0 === t.preferences[e]
                    }))[0]
                }
            }, {
                key: "approveUnexpressedPreferences",
                value: function(e) {
                    var t = this,
                        n = e.filter((function(e) {
                            return void 0 === t.preferences[e]
                        }));
                    this.express(n, !0)
                }
            }, {
                key: "disapproveUnexpressedPreferences",
                value: function(e) {
                    var t = this,
                        n = e.filter((function(e) {
                            return void 0 === t.preferences[e]
                        }));
                    this.express(n, !1)
                }
            }, {
                key: "hasApproved",
                value: function(e) {
                    if (0 === e.length) return !1;
                    for (var t = 0, n = e.length; t < n; ++t) {
                        var o = e[t];
                        if (!0 !== this.preferences[o]) return !1
                    }
                    return !0
                }
            }, {
                key: "hasDisapproved",
                value: function(e) {
                    if (0 === e.length) return !1;
                    for (var t = 0, n = e.length; t < n; ++t) {
                        var o = e[t];
                        if (!1 !== this.preferences[o]) return !1
                    }
                    return !0
                }
            }, {
                key: "express",
                value: function(e, t) {
                    for (var n = 0, o = e.length; n < o; ++n) {
                        var i = e[n];
                        this.preferences[i] = t
                    }
                }
            }, {
                key: "saveCurrentPreferencesState",
                value: function() {
                    this.savedPreferencesState = n({}, this.preferences)
                }
            }, {
                key: "goBackToSavedState",
                value: function() {
                    this.preferences = n({}, this.savedPreferencesState)
                }
            }, {
                key: "getPreferences",
                value: function() {
                    return Object.assign({}, this.preferences)
                }
            }, {
                key: "toJSON",
                value: function() {
                    return JSON.stringify(this.preferences)
                }
            }, {
                key: "toIDArray",
                value: function() {
                    return Object.keys(this.preferences)
                }
            }]), e
        }();

    function Yn(e, t, n, o) {
        var i = o,
            a = n;
        "function" == typeof a && (i = a, a = {}), i = i || function() {};
        var r, s = ((a = a || {}).method || "GET").toUpperCase(),
            c = !1 !== a.async,
            p = a.xhr || new XMLHttpRequest,
            l = a.headers || {};
        "GET" !== s && "form" !== a.type || (r = function(e) {
            return Object.keys(e).map((function(t) {
                return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
            })).join("&")
        }(t));
        var u, d = e;
        return "GET" === s && (d += r.length ? "?" + r : ""), p.open(s, d, c), p.onreadystatechange = function() {
            if (4 === p.readyState)
                if (200 === p.status || 304 === p.status) {
                    var e = (p.getResponseHeader("Content-Type") || "").match(/^application\/json\s*(;|$)/);
                    i(null, e ? JSON.parse(p.responseText || "") : p.responseText)
                } else i(p)
        }, "GET" !== s && ("json" === a.type ? (p.setRequestHeader("Content-Type", "application/json"), u = JSON.stringify(t)) : "form" === a.type ? (p.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), u = r) : u = "" + t), Object.keys(l).forEach((function(e) {
            p.setRequestHeader(e, l[e])
        })), p.send(u), p
    }
    var qn, Xn, Jn = function() {
            function e(t) {
                i(this, e), this.cs = t, this.browserDetect = new be, this.settings = {
                    inDelay: 100,
                    influx: {
                        serverUrl: "https://hits-i.iubenda.com",
                        dbName: "hits1"
                    }
                }, this.state = {
                    enabled: !0
                }
            }
            return r(e, [{
                key: "start",
                value: function(e) {
                    var t = this;
                    setTimeout((function() {
                        t.track("pageview", {
                            e_c: t.cs.options.cookiePolicyId,
                            e_a: e ? "page_view_consent" : "page_view_no_consent"
                        })
                    }), this.settings.inDelay)
                }
            }, {
                key: "track",
                value: function(e, t) {
                    var n = this;
                    if (this.unsupported() || !this.state.enabled) return !0;
                    try {
                        var o = "hits,cp=" + t.e_c;
                        "pageview" === e ? o += this.addPriorConsentValue(t.e_a) + ",sf=1" : "consent_given" === e && (o += ",cg=1" + this.addPerPurposeAnalyticsToString() + "," + this.addConsentTypeTag(t.e_n) + "=1"), o += " value=1", Yn(this.settings.influx.serverUrl + "/write?db=" + this.settings.influx.dbName, o, {
                            method: "POST",
                            headers: {
                                Authorization: "Basic aGl0czFfdTpoaXRzMV91cHdk"
                            },
                            async: !0
                        }, (function(e, t) {
                            n.cs.debug(e || t)
                        }))
                    } catch (n) {
                        this.cs.debug("Exception while hitting (I) for " + e + ", parameters: (see below), exception : " + (n.message || n)), this.cs.debug(t)
                    }
                    return !1
                }
            }, {
                key: "unsupported",
                value: function() {
                    return "Explorer" === this.browserDetect.browser && this.browserDetect.version < 10 || (!!this.browserDetect.isBotAndShouldSkipBots() || !navigator.cookieEnabled)
                }
            }, {
                key: "addPriorConsentValue",
                value: function(e) {
                    var t = "",
                        n = _iub.csEnabled && this.cs.isPriorConsent();
                    return "page_view_consent" === e ? (t += n ? ",pv_cs=1" : ",pv_cs=1,pv_cs_nopc=1", t += this.addPerPurposeAnalyticsToString()) : "page_view_no_consent" === e && (t += n ? ",pv_nocs=1" : ",pv_nocs=1,pv_nocs_nopc=1"), t
                }
            }, {
                key: "addPerPurposeAnalyticsToString",
                value: function() {
                    var e = "";
                    this.cs.isConsentGiven() ? e += ",cg_a=1" : this.cs.isConsentRejected() ? e += ",cg_r=1" : e += ",cg_p=1";
                    var t = this.getAcceptedPurposes();
                    return t && (e += "," + t), e
                }
            }, {
                key: "getAcceptedPurposes",
                value: function() {
                    if (!this.cs.options.perPurposeConsent) return "";
                    var e = this.cs.consent.purposes;
                    return Object.keys(e).map((function(t) {
                        return "p" + t + "=" + (e[t] ? 1 : 0)
                    })).join(",")
                }
            }, {
                key: "addConsentTypeTag",
                value: function(e) {
                    var t;
                    switch (e) {
                        case "documentScroll":
                            t = "cg_ds";
                            break;
                        case "documentMoved":
                            t = "cg_dm";
                            break;
                        case "bannerXClose":
                            t = "cg_bx";
                            break;
                        case "rejectButtonClick":
                            t = "cg_br";
                            break;
                        case "bannerAcceptClicked":
                            t = "cg_ba";
                            break;
                        case "documentClicked":
                            t = "cg_dc";
                            break;
                        case "cookiePolicyClosed":
                            t = "cg_cpc";
                            break;
                        default:
                            t = "cg_na"
                    }
                    return t
                }
            }, {
                key: "consentGiven",
                value: function(e) {
                    this.track("consent_given", {
                        e_c: this.cs.options.cookiePolicyId,
                        e_a: "consent_given",
                        e_n: e
                    })
                }
            }]), e
        }(),
        Kn = function(e, t, n) {
            return e + (-1 !== e.indexOf("?") ? "&" : "?") + t + "=" + n
        },
        Zn = new be,
        $n = "https:" === window.location.protocol ? "samesite=none; secure" : "samesite=lax",
        Qn = function() {
            function e(t) {
                i(this, e), this.cs = t, this.state = {
                    consentCookieNameRemote: null,
                    consentCookieNameLocal: null,
                    remoteCookieSet: !1,
                    remote: {
                        method: "iframe",
                        get: {
                            acknowledged: !1,
                            timeoutOccurred: !1
                        }
                    },
                    ccpaCookieNameRemote: null,
                    ccpaCookieNameLocal: null
                }, this.settings = {
                    consentCookieNameBase: t.settings.consentCookieNameBase
                }, this.state.consentCookieNameRemote = this.settings.consentCookieNameBase + this.cs.options.cookiePolicyId, this.state.consentCookieNameLocal = this.settings.consentCookieNameBase + this.cs.options.cookiePolicyId, this.state.consentCookieNameLocalOld = this.settings.consentCookieNameBase + "local", this.state.ccpaCookieNameRemote = this.cs.settings.USPRIVACY_COOKIE + "-" + this.cs.options.cookiePolicyId, this.state.ccpaCookieNameLocal = this.cs.settings.USPRIVACY_COOKIE, window.addEventListener("message", this.receiveMessageFromBridge.bind(this), !1)
            }
            return r(e, [{
                key: "setRemotemethod",
                value: function() {
                    this.state.remote.method = "Explorer" === Zn.browser && Zn.version < 9 ? "callback" : "iframe"
                }
            }, {
                key: "getLocalCookie",
                value: function(e, t) {
                    this.cs.debug("reading cookie from local domain: " + e);
                    for (var n = [], o = document.cookie.split(/\s*;\s*/), i = 0; i < o.length; i++) {
                        var a = o[i].split("="),
                            r = a[0],
                            s = a[1],
                            c = r.match(new RegExp("^" + e + "(-(\\d+))?$"));
                        if (c) n[parseInt(c[2], 10) || 0] = s
                    }
                    if (!n.length) return "";
                    var p = n.join("");
                    if (!0 === t) return p;
                    try {
                        return JSON.parse(p)
                    } catch (e) {
                        return JSON.parse(decodeURIComponent(p))
                    }
                }
            }, {
                key: "setLocalCookie",
                value: function(e, t, n) {
                    n = n || {}, this.resetLocalCookie(e);
                    var o = this.cs.options,
                        i = n.expireAfter || o.preferenceCookie.expireAfter,
                        a = n.path || o.localConsentPath,
                        r = "string" == typeof t ? t : encodeURIComponent(JSON.stringify(t)),
                        s = new Date;
                    s.setTime(s.getTime() + 24 * i * 60 * 60 * 1e3);
                    var c = this.getCookieLocalDomain(location.hostname),
                        p = e + "=" + r + "; expires=" + s.toUTCString() + "; path=" + a + "; domain=" + c + ";" + $n;
                    p.length > o.maxCookieSize ? this._setLocalCookieInChunks({
                        name: e,
                        valueToSave: r,
                        cookieExpression: p,
                        maxCookieSize: o.maxCookieSize,
                        maxCookieChunks: o.maxCookieChunks,
                        setCookieOptions: n
                    }) : (this.cs.debug("setting cookie on local domain : " + c + " -> " + p), document.cookie = p)
                }
            }, {
                key: "_setLocalCookieInChunks",
                value: function(e) {
                    var t = e.name,
                        n = e.valueToSave,
                        o = e.cookieExpression,
                        i = e.maxCookieSize,
                        a = e.maxCookieChunks,
                        r = e.setCookieOptions,
                        s = function(e, t) {
                            return e.match(new RegExp(".{1," + t + "}", "g")) || []
                        }(n, i - (o.length - n.length) - 2);
                    if (s.length > a) return this.cs.error("cookie `" + t + "` should be split into " + s.length + " cookies, more than the allowed " + a + " chunks, aborting."), void this.cs.debug("was trying to save: " + o);
                    for (var c = 0; c < s.length; c++) {
                        var p = 0 === c ? t : t + "-" + c;
                        this.setLocalCookie(p, s[c], r)
                    }
                }
            }, {
                key: "compactLocalCookie",
                value: function() {
                    this.cs.debug("compact remote cookies (keep " + this.cs.settings.keepLocalCookiesN + ")");
                    for (var e = document.cookie.split(";"), t = [], n = 0; n < e.length; n++) {
                        for (var o = e[n];
                            " " === o.charAt(0);) o = o.substring(1);
                        var i = o.split("=")[0]; - 1 !== i.indexOf("_iub_cs") && i !== this.state.consentCookieNameLocal && t.push({
                            cName: i,
                            cValue: JSON.parse(decodeURIComponent(o.split("=")[1]))
                        })
                    }
                    t.sort((function(e, t) {
                        return e.cValue.timestamp < t.cValue.timestamp ? 1 : -1
                    })), t.splice(0, this.cs.settings.keepLocalCookiesN);
                    for (var a = 0; a < t.length; a++) {
                        var r = t[a].cName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=" + this.cs.options.localConsentPath + "; domain=" + this.getCookieLocalDomain(location.hostname) + ";" + $n;
                        document.cookie = r
                    }
                }
            }, {
                key: "resetLocalCookie",
                value: function(e) {
                    for (var t, n = this.getCookieLocalDomain(location.hostname), o = new RegExp("(^|;)\\s*(" + e + "(-(\\d+))?)=", "g"), i = document.cookie; t = o.exec(i);) {
                        var a = t[2] + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=" + this.cs.options.localConsentPath + "; domain=" + n + ";" + $n;
                        this.cs.debug("resetting cookie on local domain : " + a), document.cookie = a
                    }
                }
            }, {
                key: "updateLocalCookieExpireAfter",
                value: function(e, t) {
                    t = t || this.cs.options.preferenceCookie.expireAfter;
                    var n = this.getLocalCookie(e);
                    this.setLocalCookie(e, n, {
                        expireAfter: t
                    })
                }
            }, {
                key: "setRemoteCookie",
                value: function(e, t) {
                    switch (this.state.remote.method) {
                        case "callback":
                            this.setRemoteCookieViaCallback(e, t);
                            break;
                        case "iframe":
                            this.setRemoteCookieViaIframe(e, t)
                    }
                }
            }, {
                key: "setLocalCMPCookie",
                value: function(e, t, n) {
                    (n = n || {}).expireAfter = n.expireAfter || this.cs.settings.MAX_TCF2_COOKIE_DURATION, this.setLocalCookie(e, t, n)
                }
            }, {
                key: "getLocalCMPCookie",
                value: function(e) {
                    return this.getLocalCookie(e, !0)
                }
            }, {
                key: "resetRemoteCookie",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    switch (this.state.remote.method) {
                        case "callback":
                            this.resetRemoteCookiesViaCallback();
                            break;
                        case "iframe":
                            this.resetRemoteCookieViaIframe(e, t)
                    }
                }
            }, {
                key: "getRemoteCookies",
                value: function() {
                    var e = this;
                    switch (qn = rt(), this.state.remote.method) {
                        case "callback":
                            this.getRemoteCookiesViaCallback();
                            break;
                        case "iframe":
                            this.getRemoteCookiesViaIframe()
                    }
                    return setTimeout((function() {
                        e.timeoutGetRemote()
                    }), this.cs.settings.timeoutOnRemoteGet), qn
                }
            }, {
                key: "timeoutGetRemote",
                value: function() {
                    this.cs.debug("Callback on getting remote fired"), this.state.remote.get.acknowledged || this.state.remote.get.timeoutOccurred || (this.state.remote.get.timeoutOccurred = !0, this.cs.warn("Getting from remote failed"), this.cs.info("Remote prefs NOT found!"), qn && qn.resolve())
                }
            }, {
                key: "compactRemoteCookies",
                value: function() {
                    switch (this.state.remote.method) {
                        case "callback":
                            this.cs.debug("skipping compact remote cookie since in 'callback' remote method");
                            break;
                        case "iframe":
                            this.cs.debug("compacting remote cookies ..."), this.createCSIframeBridge({
                                meth: "compact"
                            })
                    }
                }
            }, {
                key: "remoteCookiesSet",
                value: function(e) {
                    e ? this.cs.checkIfReloadAfterRemoteSet() : this.cs.error("remote cookies setting failed.")
                }
            }, {
                key: "pickUpRemoteCookie",
                value: function(e) {
                    if (this.state.remote.get.timeoutOccurred) this.cs.warn("Remote callback received too late");
                    else {
                        this.state.remote.get.acknowledged = !0;
                        var t = null;
                        try {
                            t = JSON.parse(e[this.state.consentCookieNameRemote])
                        } catch (e) {
                            if (this.cs.options.raiseOnException) throw e;
                            t = null
                        }
                        this.loadConsentRemoteCallback(t)
                    }
                }
            }, {
                key: "storeConsent",
                value: function() {
                    this.cs.options.skipSaveConsent ? this.cs.info("NOT saving consent in cookie since options.skipSaveConsent is provided TRUE") : (this.storeConsentLocal(), this.storeConsentRemote())
                }
            }, {
                key: "storeConsentRemote",
                value: function() {
                    this.cs.options.enableRemoteConsent ? (this.cs.info("store consent prefs into remote cookie ..."), this.setRemoteCookie(this.state.consentCookieNameRemote, this.cs.consent), this.cs.options.ccpaApplies && this.setRemoteCookie(this.state.ccpaCookieNameRemote, this.cs.usPrivacyCookie)) : this.cs.warn("skip saving remote consent since enableRemoteConsent option is provided FALSE")
                }
            }, {
                key: "storeConsentLocal",
                value: function(e) {
                    this.cs.info("store consent prefs into local cookie ...");
                    var t = this.cs.consent;
                    t.id = this.cs.options.cookiePolicyId, this.cs.state.storeClickLocal && (t.documentClicked = !0);
                    try {
                        this.setLocalCookie(this.state.consentCookieNameLocal, t, e)
                    } catch (e) {
                        this.cs.error("store_consent_loc: " + (e.message || e.toSource()))
                    }
                }
            }, {
                key: "loadConsentRemote",
                value: function() {
                    var e = this,
                        t = rt();
                    return this.cs.options.enableRemoteConsent && !this.cs.state.invalidatingConsent ? (this.getRemoteCookies().then((function(n) {
                        e.compactRemoteCookies(), t.resolve(n)
                    })), t) : (this.cs.info("skip loading remote consent since " + (this.cs.state.invalidatingConsent ? "consent has been invalidated to resurface the banner" : "enableRemoteConsent option is provided FALSE")), t.resolve(), t)
                }
            }, {
                key: "loadConsentRemoteCallback",
                value: function(e, t) {
                    if (t) {
                        switch (this.cs.info("Remote prefs found!"), this.cs.debug(t), e) {
                            case this.state.consentCookieNameRemote:
                                this.cs.consent = t, this.cs.cookie.setLocalCookie(this.state.consentCookieNameLocal, t);
                                break;
                            case this.state.ccpaCookieNameRemote:
                                this.cs.usPrivacyCookie = t, this.cs.cookie.setLocalCookie(this.state.ccpaCookieNameLocal, t)
                        }
                        this.cs.options.reloadOnConsent && (this.cs.info("page will be reloaded (reloadOnConsent==true) once local prefs are set"), this.state.reloadAfterLocaleSet = !0)
                    } else this.cs.info("Remote prefs NOT found!");
                    qn && qn.resolve(t)
                }
            }, {
                key: "loadConsentLocal",
                value: function() {
                    this.cs.debug("loading local stored consent");
                    var e = this.getLocalCookie(this.state.consentCookieNameLocal);
                    if (!e) {
                        var t = this.getLocalCookie(this.state.consentCookieNameLocalOld);
                        "" !== t && (this.cs.debug("legacy consent found"), t.id === this.cs.options.cookiePolicyId && (this.cs.debug("legacy consent match"), e = t))
                    }
                    try {
                        this.compactLocalCookie()
                    } catch (e) {
                        this.cs.debug("compacting local cookies failed, go on ...")
                    }
                    return e
                }
            }, {
                key: "receiveMessageFromBridge",
                value: function(e) {
                    if (-1 === e.origin.indexOf(_iub.cs.options.loopbackServer.iframeBridge.host)) return null;
                    var t = "";
                    try {
                        t = JSON.parse(e.data)
                    } catch (e) {
                        if (this.cs.options.raiseOnException) throw e;
                        this.cs.error("Exception while decoding message from iFrame bridge: " + (e.message || e))
                    }
                    if (t && t.action) switch (t.action) {
                        case "pickUpRemoteCookie":
                            this.state.remote.get.timeoutOccurred ? this.cs.warn("Remote callback received too late") : (this.state.remote.get.acknowledged = !0, this.loadConsentRemoteCallback(t.cName, t.data));
                            break;
                        case "remoteCookieSet":
                            this.cs.checkIfReloadAfterRemoteSet();
                            break;
                        case "remoteCookiesCompact":
                            this.cs.debug("remote cookies compact");
                            break;
                        default:
                            this.cs.error("Unrecognized message from iFrame bridge: " + JSON.stringify(t))
                    } else this.cs.error("Unrecognized message from iFrame bridge: " + JSON.stringify(t))
                }
            }, {
                key: "resetCookies",
                value: function(e) {
                    var t = !1 !== (e = e || {}).local,
                        n = !1 !== e.remote;
                    if (t && (this.resetLocalCookie(this.state.consentCookieNameLocal), this.cs.options.ccpaApplies && this.resetLocalCookie(this.state.ccpaCookieNameLocal)), n) {
                        var o = this.cs.options.cookiePolicyId;
                        this.resetRemoteCookie(this.state.consentCookieNameRemote, {
                            cookiePolicyId: o
                        }), this.cs.options.ccpaApplies && this.resetRemoteCookie(this.state.ccpaCookieNameRemote)
                    }
                }
            }, {
                key: "getCookieLocalDomain",
                value: function(e) {
                    var t, n = 2,
                        o = "localhost" === e;
                    o || 0 !== e.indexOf("www.") && (e = "www." + e);
                    var i = e.split("."),
                        a = /^[0-9]+$/.test(e.split(":")[0].split(".").join("")),
                        r = i[i.length - 2];
                    return this.cs.options.localConsentDomain ? t = "." + this.cs.options.localConsentDomain : o ? t = "" : a || (i.length > 3 && r.length < 4 && (n = 3), t = "." + e.split(".").reverse().slice(0, n).reverse().join(".")), t
                }
            }, {
                key: "_getCookieLocalDomain",
                value: function() {
                    this.getCookieLocalDomain.apply(this, arguments)
                }
            }, {
                key: "setRemoteCookieViaCallback",
                value: function(e, t) {
                    var n = this.buildLoopbackServerUrl() + this.cs.options.loopbackServer.callback.setRemoteCookiePath;
                    n = Kn(n, e, encodeURIComponent(JSON.stringify(t))), this.cs.debug("setting cross site cookies via callback at url: " + n), ee(n)
                }
            }, {
                key: "buildLoopbackServerUrl",
                value: function() {
                    var e = "https://";
                    return "iframe" === this.state.remote.method ? e += this.cs.options.loopbackServer.iframeBridge.host : e += this.cs.options.loopbackServer.callback.host, e
                }
            }, {
                key: "setRemoteCookieViaIframe",
                value: function(e, t) {
                    this.createCSIframeBridge({
                        cookieValue: t,
                        c_name: e,
                        meth: "set"
                    })
                }
            }, {
                key: "getRemoteCookiesViaCallback",
                value: function() {
                    var e = this.buildLoopbackServerUrl() + this.cs.options.loopbackServer.callback.getRemoteCookiePath;
                    this.cs.debug("getting cross site cookies via callback at url: " + e), ee(e)
                }
            }, {
                key: "getRemoteCookiesViaIframe",
                value: function() {
                    this.cs.options.gdprApplies && this.createCSIframeBridge({
                        meth: "get",
                        c_name: this.state.consentCookieNameRemote
                    }), this.cs.options.ccpaApplies && this.createCSIframeBridge({
                        meth: "get",
                        c_name: this.state.ccpaCookieNameRemote
                    })
                }
            }, {
                key: "createIframeBridge",
                value: function(e, t) {
                    var n, o = document.createElement("IFRAME"),
                        i = [location.protocol, "//", location.host, location.pathname].join("");
                    n = Kn(this.buildLoopbackServerUrl() + this.cs.options.loopbackServer.iframeBridge.iframePath, "origin", encodeURIComponent(i)), Object.keys(e).forEach((function(t) {
                        n = Kn(n, t, encodeURIComponent(JSON.stringify(e[t])))
                    })), o.setAttribute("src", n), o.setAttribute("aria-hidden", "true"), o.setAttribute("title", "Iframe bridge"), o.setAttribute("style", "width:0px; height:0px; display:none; visibility:hidden"), Q((function() {
                        document.body.appendChild(o)
                    }), !0)
                }
            }, {
                key: "createCSIframeBridge",
                value: function(e) {
                    this.createIframeBridge(e, this.cs.options.loopbackServer.iframeBridge)
                }
            }, {
                key: "resetRemoteCookieViaIframe",
                value: function(e, t) {
                    this.createCSIframeBridge({
                        options: t,
                        c_name: e,
                        meth: "reset"
                    })
                }
            }, {
                key: "resetRemoteCookiesViaCallback",
                value: function() {
                    var e = this.buildLoopbackServerUrl() + this.options.loopbackServer.callback.resetRemoteCookiePath;
                    this.debug("reset cross site cookies via callback at url: " + e), this.insertScript(e)
                }
            }]), e
        }(),
        eo = function() {
            function e(t, n) {
                i(this, e), this.cs = t, this.logger = n, this.ui = t.ui, window.addEventListener("message", this._onMessageEventHandler.bind(this))
            }
            return r(e, [{
                key: "consentGiven",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.ui.tryConsentGiven(e)
                }
            }, {
                key: "showTcfVendors",
                value: function() {
                    this.ui.showTcfVendors()
                }
            }, {
                key: "showCP",
                value: function() {
                    var e = new MouseEvent("click", {
                        bubbles: !0,
                        cancelable: !1
                    });
                    this.ui.bannerCookiePolicyClicked({
                        event: e
                    })
                }
            }, {
                key: "openPreferences",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.acceptPurposes;
                    this.ui.openPreferences({
                        acceptPurposes: t
                    })
                }
            }, {
                key: "printErrors",
                value: function() {
                    var e = this,
                        t = this.cs.state.errors;
                    t.length || this.logger.log("info", "No errors", "info", !1), Object.keys(t).forEach((function(n) {
                        e.logger.log("info", t[n], "error", !1)
                    }))
                }
            }, {
                key: "isConsentGiven",
                value: function() {
                    return this.cs.isConsentGiven()
                }
            }, {
                key: "isCcpaAcknowledged",
                value: function() {
                    return this.cs.state.ccpaAcknowledged
                }
            }, {
                key: "isCcpaOptedOut",
                value: function() {
                    return this.cs.state.ccpaOptedOut
                }
            }, {
                key: "ccpaApplies",
                value: function() {
                    return this.cs.options.ccpaApplies
                }
            }, {
                key: "gdprApplies",
                value: function() {
                    return this.cs.options.gdprApplies
                }
            }, {
                key: "lgpdApplies",
                value: function() {
                    return this.cs.options.lgpdApplies
                }
            }, {
                key: "askCcpaOptOut",
                value: function() {
                    return this.cs.askCcpaOptOut()
                }
            }, {
                key: "isPreferenceExpressed",
                value: function() {
                    return this.cs.isPreferenceExpressed()
                }
            }, {
                key: "storeConsent",
                value: function(e) {
                    var t = this.cs.consent;
                    this.cs.consent = {
                        timestamp: (new Date).toISOString(),
                        version: this.cs.settings.version
                    };
                    var n, i = null == e || e,
                        a = !1;
                    if ("boolean" == typeof i) n = i;
                    else if ("object" === o(i) && ("tcfv2" in i && (this.cs.state.tcfv2String = i.tcfv2 || ""), "consent" in i && (n = !1 !== i.consent), "purposes" in i)) {
                        var r = y(i.purposes);
                        r[1] = !0, this.cs.consent.purposes = r, a = !0
                    }
                    "boolean" == typeof n && (this.cs.consent.consent = n, a = !0), a && this.cs.cookie.storeConsent(), this.cs.consent = t
                }
            }, {
                key: "activateSnippets",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.cs.firstActivationCompletedPromise.then((function() {
                        e.cs.startActivation(t.runOnActivationDoneCallback, !0)
                    }))
                }
            }, {
                key: "setConsentOnScrollOnElement",
                value: function(e) {
                    this.ui.removeScrollObserver(), new vn(this.cs.options, _iub.csConfiguration).check(this.cs.options, {
                        consentOnScrollOnElement: e
                    }), this.ui.addEventListenerForScroll()
                }
            }, {
                key: "isGoogleNonPersonalizedAds",
                value: function() {
                    return !(1 === this.cs.options.tcfVersion && this.cs.options.googleAdsPreferenceManagement && this.cs.customPreferences && this.cs.customPreferences.hasOwnProperty(this.cs.settings.GOOGLE_ADS_PERSONALIZED_ID)) || !this.cs.customPreferences[this.cs.settings.GOOGLE_ADS_PERSONALIZED_ID]
                }
            }, {
                key: "getGoogleAdditionalConsent",
                value: function() {
                    if (2 === this.cs.options.tcfVersion && this.cs.options.googleAdditionalConsentMode && this.cs.customPreferences) return this.cs.customPreferences.gac
                }
            }, {
                key: "resetCookies",
                value: function() {
                    this.cs.cookie.resetCookies({
                        local: !0,
                        remote: this.cs.options.enableRemoteConsent
                    })
                }
            }, {
                key: "_callAPIFunction",
                value: function(t, n, o) {
                    this.logger.debug({
                        command: t,
                        params: n,
                        callback: o
                    });
                    var i = n || [];
                    if ("_onMessageEventHandler" === t || "_callAPIFunction" === t || !e.prototype.hasOwnProperty(t) || "function" != typeof this[t]) return this.logger.error("iub CS API called with undefined command: ", t), void o(null, !1);
                    o(this[t].apply(this, i), !0)
                }
            }, {
                key: "_onMessageEventHandler",
                value: function(t) {
                    try {
                        var n = "string" == typeof t.data ? e._parseJson(t.data) : t.data,
                            o = n ? n.__iubCsCall : null;
                        if (!o) return;
                        var i = o.command,
                            a = o.parameters,
                            r = o.callId;
                        this._callAPIFunction(i, a, (function(e, n) {
                            var o = {
                                __iubCsReturn: {
                                    returnValue: e,
                                    success: n,
                                    callId: r
                                }
                            };
                            t.source.frames.postMessage(JSON.stringify(o), t.origin)
                        }))
                    } catch (e) {
                        this.logger.error("Error: " + e)
                    }
                }
            }, {
                key: "acceptAll",
                value: function() {
                    this.cs.acceptAll("cookiePolicyClosed")
                }
            }], [{
                key: "_parseJson",
                value: function(e) {
                    try {
                        return JSON.parse(e)
                    } catch (e) {}
                    return null
                }
            }]), e
        }(),
        to = "body{margin:0;font-family:sans-serif}*{box-sizing:border-box}.iubenda-cs__overlay{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;overflow:auto;padding:1rem;background-color:rgba(0,0,0,.1)}.iubenda-cs__dialog{max-width:320px;border-radius:.5rem;box-shadow:0 0 2rem rgba(0,0,0,.25),0 0 0 1px rgba(0,0,0,.05);margin:auto;overflow:hidden;padding:1.5rem;display:flex;flex-direction:column;grid-gap:1.5rem;background:#fff;color:#222}.iubenda-cs__body h1{font-size:1.25rem;margin:0 0 .5rem 0}.iubenda-cs__body p{margin:0;font-weight:300}.iubenda-cs__button{font-size:100%;border-radius:4rem;padding:.5rem 1rem;font-weight:700;background-color:#0073ce;color:#fff;border:0;width:100%;cursor:pointer}.iubenda-cs__button:hover{background-color:#005aa0}@media (max-height:320px) and (max-width:240px){.iubenda-cs__overlay{padding:0}}@media (max-height:320px) and (min-width:480px){.iubenda-cs__dialog{flex-direction:row;max-width:100%;align-items:center}.iubenda-cs__button{padding:1rem 3rem}}";

    function no(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            o = n.styleOptions,
            i = Lt(e, t),
            a = t.join(","),
            r = ke("blocked_overlay.title"),
            s = ke("blocked_overlay.paragraph").replace("%{purposes}", i),
            c = ke("blocked_overlay.accept_button"),
            p = re({
                "background-color": null == o ? void 0 : o.backgroundColor,
                color: null == o ? void 0 : o.textColor
            }),
            l = re({
                "background-color": null == o ? void 0 : o.acceptButtonColor,
                color: null == o ? void 0 : o.acceptButtonCaptionColor
            });
        return '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>'.concat(r, "</title>\n  <style>").concat(to, '</style>\n</head>\n\n<body>\n<div class="iubenda-cs__overlay">\n  <div class="iubenda-cs__dialog" ').concat(p, '>\n    <div class="iubenda-cs__body">\n      <h1>').concat(r, "</h1>\n      <p>").concat(s, '</p>\n      </div>\n      <div class="iubenda-cs__footer">\n        <button\n          class="iubenda-cs__button iubenda-cs__preferences-link"\n          ').concat(l, '\n          data-accept-purposes="').concat(a, '"\n        >\n          ').concat(c, "\n        </button>\n      </div>\n    </div>\n  </div>\n</body>\n\n</html>\n  ")
    }

    function oo(e) {
        var t, n, o, i = null == e || null === (t = e.preferenceCookie) || void 0 === t || null === (n = t.tcfV2Name) || void 0 === n ? void 0 : n.trim();
        return "string" == typeof i && i ? i.trim().replace(/%\{cookie_policy_id\}/g, null !== (o = null == e ? void 0 : e.cookiePolicyId) && void 0 !== o ? o : "") : "euconsent-v2"
    }

    function io(e, t) {
        var n = 864e5;
        return (t * n - Date.now() + new Date(e).getTime()) / n
    }

    function ao(e) {
        var t = e ? function(e) {
            for (var t = atob(e), n = new Array(8 * t.length), o = 0; o < t.length; o++)
                for (var i = t.charCodeAt(o), a = 7; a >= 0; a--) {
                    var r = i & 1 << a ? 1 : 0;
                    n[8 * o + (7 - a)] = r
                }
            return n
        }(function(e) {
            var t = e.split(".")[0].replace(/-/g, "+").replace(/_/g, "/");
            switch (t.length % 4) {
                case 0:
                    break;
                case 2:
                    t += "==";
                    break;
                case 3:
                    t += "=";
                    break;
                default:
                    throw new Exception("Illegal base64url string!")
            }
            return t
        }(e)) : [];
        return {
            getTcfVersion: function() {
                return so(t.slice(0, 6))
            },
            getPurposeOneTreatment: function() {
                return so(t.slice(200, 201))
            },
            getIsServiceSpecific: function() {
                return so(t.slice(138, 139))
            },
            getVendorListVersion: function() {
                return so(t.slice(120, 132))
            },
            getLastUpdate: function() {
                return co(t.slice(42, 78))
            },
            getCreationDate: function() {
                return co(t.slice(7, 42))
            }
        }
    }

    function ro(e) {
        var t = [],
            n = 0,
            o = !1,
            i = (e || "").split("~"),
            a = i[0],
            r = i[1];
        if (a && r) {
            for (var s = r.split(".").map((function(e) {
                    return +e
                })).sort((function(e, t) {
                    return e - t
                })), c = Math.max.apply(null, s), p = 1; p <= c; p++) {
                var l = -1 !== s.indexOf(p);
                l !== o && (t.push(n), o = l, n = 0), n++
            }
            n && t.push(n)
        }
        var u = a + "~" + String.fromCharCode.apply(null, new Int16Array(t));
        return btoa(unescape(encodeURIComponent(u)))
    }

    function so(e) {
        return parseInt(e.join(""), 2)
    }

    function co(e) {
        return 100 * so(e)
    }

    function po(e) {
        return "1~" === (e || "").substring(0, 2) ? function(e) {
            var t = (e || "").split("~"),
                n = t[0],
                o = t[1] || "",
                i = [];
            if (n) {
                if (o) {
                    var a = decodeURIComponent(escape(atob(o)));
                    i = new Int16Array(a.split("").map((function(e) {
                        return e.charCodeAt(0)
                    })))
                }
                return n + "~" + i.join(".")
            }
            return ""
        }(e) : function(e) {
            var t = decodeURIComponent(escape(atob(e))).split("~"),
                n = t[0],
                o = t[1] || "",
                i = [];
            if (n) {
                if (o)
                    for (var a = 1, r = new Int16Array(o.split("").map((function(e) {
                            return e.charCodeAt(0)
                        }))), s = 0; s < r.length; s++) {
                        var c = r[s];
                        if (s % 2 != 0)
                            for (var p = 0; p < c; p++) i.push(a + p);
                        a += c
                    }
                return n + "~" + i.join(".")
            }
            return ""
        }(e)
    }
    var lo = function() {
        function e(t, n, o, a) {
            i(this, e), Xn = a, at(this), this.options = t, this.settings = {
                version: n,
                cmpVersion: 283,
                tracker: {
                    url: "https://hits.iubenda.com/piwik.php"
                },
                timeoutOnRemoteGet: 1e3,
                timeoutBeforeReload: 1e3,
                timeoutBeforeReloadWithCmp: 3e4,
                keepLocalCookiesN: 10,
                urlForRemoteConf: "https://www.iubenda.com/cookie-solution/confs/js/%{cookie_policy_id}.js",
                TCF_V2_CONSENT_COOKIE: "euconsent-v2",
                GOOGLE_ADS_PERSONALIZED_ID: "googleAdsPersonalized",
                USPRIVACY_COOKIE: "usprivacy",
                consentCookieNameBase: "_iub_cs-",
                MAX_TCF2_COOKIE_DURATION: 360
            }, this.VERSION = this.settings.version, this.settings.granularCookieName = this.settings.consentCookieNameBase + this.options.cookiePolicyId + "-granular", this.state = {
                enabled: !0,
                preLoaded: !1,
                errors: [],
                fatalError: !1,
                inlineUniqId: 0,
                invalidatingConsent: !1,
                inIframe: !1,
                consentFoundOnLoad: !1,
                reloadAfterRemoteSet: !1,
                reloadAfterLocaleSet: !1,
                storeClickLocal: !1,
                activatingNoPriorConsent: !1,
                needsConsent: !0,
                tcfv2String: null,
                cpOpen: !1,
                isCmpCssLoaded: 0,
                uspString: "1---",
                ccpaAcknowledged: !1,
                ccpaOptedOut: !1,
                ccpaUspVersion: 1,
                ccpaUspStateFound: !1,
                ccpaOptOutConfirmationOpen: !1,
                currentView: ""
            }, this.activator = new Hn(Xn), this.crossSiteConsent = {}, this.consent = this.getInitialConsent(), this.checkIfInIframe(), this.ui = new en(this), this.tracker = new Jn(this), this.cookie = new Qn(this), this.usPrivacyCookie = this.cookie.getLocalCookie(this.settings.USPRIVACY_COOKIE), this.browserDetect = new be, this.api = new eo(this, Xn), this.cmpLibraryPromise = o, this.storeCMPChoicePromise = rt(), this.getCustomPreferencesResult = this.fetchCustomPreferences(), this.savedPreferences = {}, this.customPurposes = null, this.firstActivationCompletedPromise = rt()
        }
        return r(e, [{
            key: "getInitialConsent",
            value: function() {
                return {
                    consent: void 0,
                    timestamp: void 0,
                    version: void 0
                }
            }
        }, {
            key: "checkIfInIframe",
            value: function() {
                try {
                    this.state.inIframe = window.self !== window.top
                } catch (e) {}
            }
        }, {
            key: "setCurrentView",
            value: function(e) {
                this.state.currentView = e
            }
        }, {
            key: "fetchCustomPreferences",
            value: function() {
                var e = this.cookie.getLocalCookie(this.settings.granularCookieName),
                    t = this.decodeCustomPreferences(e);
                return this.isGoogleAdditionalConsentValid() || delete t.gac, t
            }
        }, {
            key: "decodeCustomPreferences",
            value: function(e) {
                return e && Object.prototype.hasOwnProperty.call(e, "gac") ? g(e, {
                    gac: po(e.gac)
                }) : e
            }
        }, {
            key: "renewCookies",
            value: function() {
                if (this.state.needsConsent && this.isPreferenceExpressed()) {
                    var e = io(this.consent.timestamp, this.options.preferenceCookie.expireAfter);
                    this.cookie.storeConsentLocal({
                        expireAfter: e
                    })
                }
                if (this.options.enableTcf && this.state.tcfv2String) {
                    var t = {
                        expireAfter: io(ao(this.state.tcfv2String).getLastUpdate(), this.settings.MAX_TCF2_COOKIE_DURATION)
                    };
                    this.storeCMPCookie(this.state.tcfv2String, t)
                }
                if (this.storeCustomPreferences(this.getCustomPreferencesResult, !0), this.usPrivacyCookie) {
                    var n = (this.usPrivacyCookie.optOutDate ? this.usPrivacyCookie.optOutDate : 0) + (this.options.ccpaCookie.expireAfter ? this.options.ccpaCookie.expireAfter : 0);
                    this.cookie.setLocalCookie(this.settings.USPRIVACY_COOKIE, this.usPrivacyCookie, {
                        expireAfter: n
                    })
                }
            }
        }, {
            key: "isPreferenceExpressed",
            value: function() {
                return this.options.perPurposeConsent ? this.purposesPreference.hasGivenPreference(this.purposes.toIDArray()) : this.consent && void 0 !== this.consent.consent
            }
        }, {
            key: "storeCMPCookie",
            value: function(e, t) {
                var n = this.cookie,
                    o = oo(this.options);
                n.setLocalCMPCookie(o, e, t), this.checkIfReloadAfterRemoteSet()
            }
        }, {
            key: "checkIfReloadAfterRemoteSet",
            value: function() {
                this.debug("remote cookies successfully set."), "number" == typeof this.state.reloadAfterRemoteSet && (this.state.reloadAfterRemoteSet--, this.state.reloadAfterRemoteSet <= 0 && this.reloadPage())
            }
        }, {
            key: "reloadPage",
            value: function() {
                this.info("Reloading page at consent given ..."), location.reload(!0)
            }
        }, {
            key: "storeCustomPreferences",
            value: function(e, t) {
                if (this._acknowledgeCustomPreferences(e), e) {
                    (t ? this.isGoogleAdditionalConsentValid() : this.options.googleAdditionalConsentMode) || delete e.gac;
                    var n = this.encodeCustomPreferences(e);
                    this.cookie.setLocalCookie(this.settings.granularCookieName, n)
                }
            }
        }, {
            key: "_acknowledgeCustomPreferences",
            value: function(e) {
                this.customPreferences = g(this.customPreferences || {}, e)
            }
        }, {
            key: "encodeCustomPreferences",
            value: function(e) {
                return e && e.gac ? g(e, {
                    gac: ro(e.gac)
                }) : e
            }
        }, {
            key: "preLoad",
            value: function() {
                var e = this;
                return this.debug("executing preLoad()..."), this.state.preLoaded ? (this.debug("already preloaded, skipping ..."), !0) : (this.options.cookiePolicyId || this.fatal("Cannot start IubendaCookieSolution: cookiePolicyId NOT PROVIDED."), !!this.skipUnsupported() || (this.browserDetect.isBotAndShouldSkipBots() ? (this.info("BOT detected: activating snippets and avoid banner rendering."), this.applyConsent(!0), null) : (this.fireCallback("onBeforePreload"), this.usPrivacyCookie && this.setUspString(this.usPrivacyCookie.uspString), this.options.enableRemoteConsent && !this.options.skipSaveConsent || !this.options.ccpaApplies || this.state.ccpaAcknowledged || this.deleteConsent(), this.fetchPurposes(), this.loadTCFConsent().then((function() {
                    e.loadConsent().then((function(t) {
                        var n = t.doConsentRewrite;
                        e.state.preLoaded = !0, e.start({
                            doConsentRewrite: n
                        })
                    }))
                })), null)))
            }
        }, {
            key: "deleteConsent",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                e.skipResetCookies = e.skipResetCookies || !1, e.skipResetRemoteCookies = e.skipResetRemoteCookies || !1, this.consent = this.getInitialConsent(), this.state.invalidatingConsent = !0, e.skipResetCookies || this.cookie.resetCookies({
                    local: !0,
                    remote: this.options.enableRemoteConsent && !e.skipResetRemoteCookies
                })
            }
        }, {
            key: "fetchPurposes",
            value: function() {
                if (this.options.purposes) this.purposes = kn.fromList(this.options.purposes);
                else if (0 !== _iub.csPurposes.length) this.purposes = kn.fromList(_iub.csPurposes.join(","));
                else {
                    var e = this.cookie.getLocalCookie(this.settings.consentCookieNameBase + this.options.cookiePolicyId);
                    e && "object" === o(e) && e.purposes && (this.purposes = kn.fromList(Object.keys(e.purposes).join(",")))
                }
                this.purposes && 0 !== this.purposes.size() || (this.purposes = kn.allPurposes), this.purposesPreference = new Gn, this.purposes.purposes[1] = kn.allPurposes.purposes[1], this.purposesPreference.setPreference(1, !0)
            }
        }, {
            key: "loadTCFConsent",
            value: function() {
                var e = this,
                    t = rt(),
                    n = this.options,
                    o = oo(n);
                return n.enableTcf ? (this.cmpLibraryPromise.then((function() {
                    var i = e.fetchCMPCookie(),
                        a = e.getCustomPreferencesResult,
                        r = e.getMissingCustomPreferences(a).length > 0,
                        s = (n.askConsentIfCMPNotFound || 1 !== e.state.tcfConsentStatus) && (!i || r) && n.gdprApplies;
                    if (i) {
                        var c = i.split(".");
                        c.length > 1 && (e.state.tcfv2String = c[0], e.cookie.setLocalCMPCookie(o, c[0]))
                    }!n.skipSaveConsent && s && e.deleteConsent(), t.resolve()
                })), t) : t.resolve()
            }
        }, {
            key: "fetchCMPCookie",
            value: function() {
                var e = oo(this.options);
                if (!this.options.enableTcf) return null;
                var t = this.state.tcfv2String;
                if (t) return this.isTcfConsentValid(t) || (t = null, this.state.tcfv2String = ""), t;
                var n = this.cookie.getLocalCMPCookie(e);
                return n || (n = this.cookie.getLocalCMPCookie(this.settings.TCF_V2_CONSENT_COOKIE)), this.isTcfConsentValid(n) || (n = null), this.state.tcfv2String = n || "", n
            }
        }, {
            key: "isTcfConsentValid",
            value: function(e) {
                var t = this.getTcfConsentStatus(e);
                return this.state.tcfConsentStatus = t, 0 === t
            }
        }, {
            key: "getTcfConsentStatus",
            value: function(e) {
                var t = ao(e);
                return (e ? this.needsConsentOnVendorListUpdate(t) && 2 : 1) || this.isTcfConsentCreatedBefore(t, _iub.invTcfC || null) && 3 || this.isTcfConsentUpdatedBefore(t, Math.max(_iub.invTcfU || 0, this.options.invalidateConsentBefore || 0)) && 4 || this.isNotServiceSpecific(t) && 5 || this.didntConsentNewVendors(t) && 6 || 0
            }
        }, {
            key: "isGoogleAdditionalConsentValid",
            value: function() {
                var e = !0;
                null !== this.state.tcfv2String && (e = 0 === this.getTcfConsentStatus(this.state.tcfv2String));
                return this.options.googleAdditionalConsentMode && e
            }
        }, {
            key: "needsConsentOnVendorListUpdate",
            value: function(e) {
                var t = 1 === this.options.tcfVersion ? _iub.GVL : _iub.GVL2;
                if (e.getVendorListVersion() < t) {
                    var n = ((new Date).getTime() - e.getLastUpdate()) / 864e5,
                        o = this.options.newConsentAtVendorListUpdate;
                    if (null != o) return n > o
                }
                return !1
            }
        }, {
            key: "isTcfConsentCreatedBefore",
            value: function(e, t) {
                var n = t,
                    o = new Date;
                o.setDate(o.getDate() - this.settings.MAX_TCF2_COOKIE_DURATION), (!n && this.settings.MAX_TCF2_COOKIE_DURATION || n < o) && (n = o);
                var i = new Date(n).getTime();
                return n && e.getCreationDate() < i
            }
        }, {
            key: "isTcfConsentUpdatedBefore",
            value: function(e, t) {
                return t && e.getLastUpdate() < Wn(t)
            }
        }, {
            key: "isNotServiceSpecific",
            value: function(e) {
                return !e.getIsServiceSpecific()
            }
        }, {
            key: "didntConsentNewVendors",
            value: function(e) {
                var t = e.getCreationDate(),
                    n = e.getLastUpdate(),
                    o = Date.UTC(2020, 7, 18, 21);
                return t < o && n < o && n - t > 36e5
            }
        }, {
            key: "getMissingCustomPreferences",
            value: function(e) {
                for (var t = [], n = this.getCustomPurposes(), o = 0; o < n.length; o++) {
                    var i = n[o];
                    e.hasOwnProperty(i.id) || t.push(i.id)
                }
                return t
            }
        }, {
            key: "getCustomPurposes",
            value: function() {
                return this.customPurposes || (this.customPurposes = [], this.options.googleAdsPreferenceManagement && this.customPurposes.push({
                    id: this.settings.GOOGLE_ADS_PERSONALIZED_ID,
                    name: "Personalized advertising from Google and its partners",
                    description: "Google and its partner ad technology providers use cookies for personalization and measurement purposes. Users can customize their consent preferences for both Google and its partners. To learn more, please refer to the <a target='_blank' rel='noopener' href='https://support.google.com/admanager/answer/9012903'>privacy policies of the respective services</a>."
                }), this.options.googleAdditionalConsentMode && this.customPurposes.push({
                    id: "gac",
                    name: "",
                    description: ""
                })), this.customPurposes
            }
        }, {
            key: "loadConsent",
            value: function() {
                var e = this,
                    t = {
                        consent: null,
                        doConsentRewrite: null
                    },
                    n = rt(),
                    o = this.cookie.loadConsentLocal();
                if (o) {
                    var i = o.documentClicked;
                    delete o.documentClicked, this.info("local stored consent found:"), Object.keys(o).forEach((function(t) {
                        e.consent[t] = o[t]
                    })), t.doConsentRewrite = !1, i && (this.tracker.consentGiven("documentClicked"), this.fireCallback("onUserGivesConsent", "documentClicked"), t.doConsentRewrite = !0, this.options.enableRemoteConsent && this.cookie.storeConsentRemote()), this.options.enableRemoteConsent && this.cookie.compactRemoteCookies(), t.consent = o, n.resolve(t)
                } else this.info("local stored consent NOT found"), this.cookie.loadConsentRemote().then((function(e) {
                    t.consent = e, n.resolve(t)
                }));
                return n
            }
        }, {
            key: "fireCallback",
            value: function(e, t) {
                var n = this.options.callback[e],
                    o = t;
                switch (this.emit("callback.before." + e, o), e) {
                    case "onReady":
                        o = this.consent.consent;
                        break;
                    case "onPreferenceExpressed":
                    case "onPreferenceNotNeeded":
                        this.fireCallback("onPreferenceExpressedOrNotNeeded", o);
                        break;
                    case "onConsentRead":
                        !n && this.isConsentGiven() && (n = this.options.callback.onConsentGiven);
                        break;
                    case "onCcpaFirstAcknowledged":
                        n = this.options.callback.onCcpaFirstAcknowledged;
                        break;
                    case "onCcpaFirstOptOut":
                        n = this.options.callback.onCcpaFirstOptOut
                }
                if (n) try {
                    this.debug("activating callback: " + n), n(o)
                } catch (t) {
                    if (this.options.raiseOnException) throw t;
                    "onError" !== e ? this.error("Exception while invoking callback " + e + ": " + (t.message || t)) : this.log("Exception while invoking callback " + e + ": " + (t.message || t), "error")
                }
            }
        }, {
            key: "isConsentGiven",
            value: function() {
                return !!this.consent && (this.options.perPurposeConsent ? !!this.consent.purposes && this.purposesPreference.hasApproved(this.purposes.toIDArray()) : !0 === this.consent.consent)
            }
        }, {
            key: "start",
            value: function() {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.debug("executing start() ...");
                var n = this.options,
                    o = !1 !== t.doConsentRewrite;
                if (this.state.fatalError) return this.error("exiting start() since in fatalError ..."), !1;
                if (this.setup()) {
                    this.info("IubendaCookieSolution setup OK! Starting ..."), this.emit("start"), this.tracker.start(this.isPreferenceExpressed()), Q((function() {
                        if (e.options.enableTcf && mt(), e.ui.createFloatingPreferencesButton(), At(), e.ui.bindVendorListBtns(), n.enableCcpa && n.ccpaApplies)
                            for (var t = document.querySelectorAll(".iubenda-ccpa-opt-out"), o = 0; o < t.length; o++) e.handleAskOptOutClick(t[o])
                    }), !0), this.renewCookies(), this.state.needsConsent && this.isPreferenceExpressed() ? (this.isConsentGiven() ? (this.state.consentFoundOnLoad = !0, o && this.cookie.storeConsentLocal(), this.fireCallback("onPreferenceExpressed", this.consent)) : (this.options.callback.onConsentRead ? this.fireCallback("onConsentRead") : this.isConsentRejected() && this.fireCallback("onConsentRejected"), this.fireCallback("onPreferenceExpressed", this.consent)), this.updateTcfApi(!1), this.ui.bindButtons(), this.csReady()) : this.state.needsConsent && !this.isConsentGiven() ? (this.updateTcfApi(!0), this.startCsUi(), this.isPriorConsent() || (this.state.activatingNoPriorConsent = !0, this.fireCallback("onPreferenceNotNeeded"))) : (this.updateTcfApi(!1), this.ui.bindButtons(), this.csReady());
                    var i = !this.state.needsConsent;
                    if (this.applyConsent(i), this.state.reloadAfterLocaleSet && this.reloadPage(), n.enableCcpa && (window.__uspapi = function(t, n, o) {
                            "function" == typeof o && 1 === n && "getUSPData" === t && o({
                                version: n,
                                uspString: e.getUspString()
                            }, !0)
                        }, n.ccpaApplies)) {
                        this.shouldAcknowledgeCcpaOnLoad() && this.acknowledgeCcpa();
                        for (var a = M("#iubenda-cs-banner .iubenda-privacy-policy-link"), r = 0; r < a.length; r++) this.handleBannerPPClick(a[r])
                    }
                } else this.fatal("Cannot start IubendaCookieSolution");
                return n.ccpaApplies && ut(), null
            }
        }, {
            key: "setup",
            value: function() {
                var e, t = this;
                if (this.debug("executing setup() ..."), this.state.fatalError) return this.error("exiting setup() since in fatalError ..."), !1;
                if (this.invalidateConsentIfNecessary(), this.options.perPurposeConsent && (null === (e = this.consent) || void 0 === e ? void 0 : e.purposes) && Object.keys(this.consent.purposes).forEach((function(e) {
                        t.purposesPreference.setPreference(e, t.consent.purposes[e])
                    })), !this.options.gdprApplies && !this.options.lgpdApplies) {
                    if (this.options.ccpaApplies && this.options.ccpaNoticeDisplay && !this.state.ccpaAcknowledged) return this.state.needsConsent = !0, !0;
                    this.info("Setting state.needsConsent = false since gdprApplies is false, scripts will be activated and banner will not be shown."), this.state.needsConsent = !1
                }
                return this.migratePurposesPreferences(), !0
            }
        }, {
            key: "invalidateConsentIfNecessary",
            value: function() {
                this.isPreferenceValid() || this.deleteConsent({
                    skipResetCookies: this.options.skipSaveConsent,
                    skipResetRemoteCookies: !this.options.enableRemoteConsent
                })
            }
        }, {
            key: "isPreferenceValid",
            value: function() {
                var e, t, n = Wn(this.consent.timestamp || 0),
                    o = Wn(this.options.invalidateConsentBefore);
                if (o && n > 0 && n < o) return !1;
                if (this.options.consApiKey && !(null === (e = this.consent) || void 0 === e || null === (t = e.cons) || void 0 === t ? void 0 : t.rand)) {
                    var i = this.options.invalidateConsentWithoutLog,
                        a = "string" == typeof i || "number" == typeof i,
                        r = a ? new Date(i).getTime() : null;
                    if (!0 === i || a && r > n) return !1
                }
                return !0
            }
        }, {
            key: "migratePurposesPreferences",
            value: function() {
                var e = this;
                if (this.options.perPurposeConsent && !this.isPreferenceExpressed() && this.consent && void 0 !== this.consent.consent) {
                    this.debug("switching from no per-purpose to per-purpose");
                    var t, n = this.purposes.toIDArray();
                    for (t = 0; t < n.length; ++t) {
                        var o = +n[t],
                            i = 1 === o || this.consent.consent;
                        this.purposesPreference.setPreference(o, i)
                    }
                    this.consent.purposes = this.purposesPreference.getPreferences()
                } else if (!this.options.perPurposeConsent && void 0 === this.consent.consent && void 0 !== this.consent.purposes) {
                    this.debug("switching from per-purpose to no per-purpose");
                    var a = Object.keys(this.consent.purposes).filter((function(e) {
                        return 1 != +e
                    })).map((function(t) {
                        return e.consent.purposes[t]
                    }));
                    a.length && (a.every(Boolean) ? this.consent.consent = !0 : a.some(Boolean) || (this.consent.consent = !1))
                }
            }
        }, {
            key: "handleAskOptOutClick",
            value: function(e) {
                var t = this;
                le(e, "click", (function(e) {
                    e.stopPropagation(), t.askCcpaOptOut()
                }))
            }
        }, {
            key: "askCcpaOptOut",
            value: function() {
                this.ui.showCcpaOptOutConfirmBox()
            }
        }, {
            key: "updateTcfApi",
            value: function(e, t) {
                var n = this.options;
                if (n.enableTcf && _iub.cmp && _iub.cmp.exposeCmpGlobalFunction) {
                    if (this.state.lastCmpUiVisibleState === !!e) return;
                    this.state.lastCmpUiVisibleState = !!e, this.info("Going to expose global API, reading data ...");
                    var o = this.fetchCustomPreferences();
                    this.info("Updating consent data via CMP API ..."), _iub.cmp.exposeCmpGlobalFunction(t || this.state.tcfv2String, n.gdprAppliesGlobally, n.gdprApplies, !1, o, e)
                }
            }
        }, {
            key: "csReady",
            value: function() {
                _iub.csReady = !0, this.state.ccpaAcknowledged && this.fireCallback("onCcpaAcknowledged"), this.state.ccpaOptedOut && this.fireCallback("onCcpaOptOut"), this.fireCallback("onReady")
            }
        }, {
            key: "startCsUi",
            value: function() {
                var e = this;
                this.options.hideInIframe && this.state.inIframe || this.startCmpWidget().then((function() {
                    e.ui.start()
                }))
            }
        }, {
            key: "startCmpWidget",
            value: function() {
                var e = this,
                    t = rt();
                return this.options.enableTcf ? this.cmpLibraryPromise.then((function() {
                    e.ui.setCmpWidget(e.state.tcfv2String, e.getCustomPreferencesResult), t.resolve()
                })) : t.resolve(), t
            }
        }, {
            key: "isPriorConsent",
            value: function() {
                return this.state.enabled ? this.state.needsConsent ? this.options.priorConsent : (this.info("Prior consent is not needed for the current user."), !1) : (this.info("Cookie policy NOT ENABLED, starting in priorConsent false mode."), !1)
            }
        }, {
            key: "startActivation",
            value: function(e, t) {
                var n = this,
                    o = this.options;
                if (!_iub.csActivationViaSafeMode || t) {
                    if (!_iub.csActivationInProgress) {
                        _iub.csActivationInProgress = !0, _iub.csActivationDone = !1;
                        var i = null;
                        e && (i = this.options.get("callback.onActivationDone"));
                        var a = this.firstActivationCompletedPromise;
                        this.emit("before-activation");
                        var r = this.purposesPreference;
                        !this.state.enabled && o.perPurposeConsent && ((r = new Gn).preferences = y(this.purposesPreference.preferences), r.approveUnexpressedPreferences(this.purposes.toIDArray()));
                        var s = {
                            purposesPreference: this.purposesPreference,
                            consent: this.consent.consent
                        };
                        this.startActivator(s, (function() {
                            _iub.csActivationInProgress = !1, _iub.csActivationDone = !0, n.emit("activation-done"), a && !a._isResolved && a.resolve(), i && i()
                        }))
                    }
                } else Xn.debug("activation already done or in progress by SAFEMODE activator. Yielding."), this.firstActivationCompletedPromise.resolve()
            }
        }, {
            key: "handleBannerPPClick",
            value: function(e) {
                var t = this;
                le(e, "click", (function(e) {
                    e.stopPropagation(), t.ui.showPPCcpaSection(t.options.cookiePolicyInOtherWindow)
                }))
            }
        }, {
            key: "skipUnsupported",
            value: function() {
                return !this.browserDetect.isMobile() && "Explorer" === this.browserDetect.browser && this.browserDetect.version < 11
            }
        }, {
            key: "isTcfConsentCreatedBefore",
            value: function(e, t) {
                var n = t,
                    o = new Date;
                o.setDate(o.getDate() - this.settings.MAX_TCF2_COOKIE_DURATION), (!n && this.settings.MAX_TCF2_COOKIE_DURATION || n < o) && (n = o);
                var i = new Date(n).getTime();
                return n && e.getCreationDate() < i
            }
        }, {
            key: "setUspString",
            value: function(e) {
                null === e ? this.state.ccpaUspStateFound = !1 : (this.state.ccpaUspStateFound = !0, this.state.ccpaAcknowledged = "Y" === e[1], this.state.ccpaOptedOut = "Y" === e[2])
            }
        }, {
            key: "applyConsent",
            value: function(e) {
                var t, n = !!e;
                (this.debug("applying current consent [with force option: " + n + "] ..."), n || this.isPreferenceExpressed()) ? (this.info("consent has been given ..."), this.state.activatingNoPriorConsent ? this.info("snippets already activated ...") : (this.updateTcfApi(!1), this.startActivation(!0)), this.fireCallback(this.state.needsConsent ? "onConsentRead" : "onPreferenceNotNeeded")) : (!1 === (null === (t = this.consent) || void 0 === t ? void 0 : t.consent) && this.activator.emit("re-enable-navigation"), this.info("consent NOT given"), this.startActivator())
            }
        }, {
            key: "startActivator",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                    n = {
                        perPurposeConsent: this.options.perPurposeConsent,
                        skipPurposeCheck: !this.state.enabled,
                        gdprApplies: this.options.gdprApplies,
                        lgpdApplies: this.options.lgpdApplies,
                        promptToAcceptOnBlockedElements: this.options.promptToAcceptOnBlockedElements,
                        banner: this.options.banner,
                        renderOverlay: no
                    };
                this.activator.activateOnDomReady(t, n, e, this.state.ccpaOptedOut)
            }
        }, {
            key: "consentGiven",
            value: function() {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = t.eventName,
                    o = !(!this.isCpOpen() && this.isConsentRejected()) && !("rejectButtonClick" === n);
                if (this.options.perPurposeConsent && (o ? this.purposesPreference.approveUnexpressedPreferences(this.purposes.toIDArray()) : this.purposesPreference.express(this.purposes.toIDArray(), !1), this.purposesPreference.setPreference(1, !0)), this.options.enableTcf && !this.options.perPurposeConsent) try {
                    var i = this.ui.cmpWidget.getEnabledPurposeIds(); - 1 === i.indexOf(1) && this.ui.CPiFrame.isInTcfView() && (o = !1)
                } catch (e) {}
                this.consent = this.getConsentObj(o), "documentClicked" === n && (this.state.storeClickLocal = !0), this.options.reloadOnConsent && !this.state.consentFoundOnLoad && (this.state.reloadAfterRemoteSet = (this.options.enableRemoteConsent ? 1 : 0) + (this.options.enableTcf ? 1 : 0)), this.cookie.storeConsent(), this.options.enableTcf && !this.options.skipSaveConsent ? this.storeCmpChoice().then((function(t) {
                    e.updateTcfApi(!1, t), e.fireConsentCallbacks(n)
                })) : this.fireConsentCallbacks(n), "documentClicked" !== n && this.tracker.consentGiven(n)
            }
        }, {
            key: "isCpOpen",
            value: function() {
                return this.state.cpOpen
            }
        }, {
            key: "isConsentRejected",
            value: function() {
                if (!this.isPreferenceExpressed()) return !1;
                if (this.options.perPurposeConsent) {
                    if (!this.consent.purposes) return !1;
                    var e = this.purposes.toIDArray().filter((function(e) {
                        return "1" !== e
                    }));
                    return this.purposesPreference.hasDisapproved(e)
                }
                return !1 === this.consent.consent
            }
        }, {
            key: "getConsentObj",
            value: function(e) {
                var t = {
                    timestamp: (new Date).toISOString(),
                    version: this.settings.version
                };
                return this.options.perPurposeConsent ? t.purposes = this.purposesPreference.preferences : t.consent = e, t
            }
        }, {
            key: "storeCmpChoice",
            value: function() {
                var e = this,
                    t = this.ui,
                    n = t.cmpWidget,
                    o = this.state.tcfv2String,
                    i = rt(),
                    a = this.getCustomPreferencesResult;
                return this._waitForCmpWidgetRender().then((function() {
                    e._fetchVendorIdsToEnable(n, o).then((function(r) {
                        t.consentRejected ? (n.disableAllPurposesAndAllVendors(), (e.options.googleAdsPreferenceManagement || e.options.googleAdditionalConsentMode) && n.disableAllCustomPurposes()) : !o && t.consentAccepted ? (n.enableAllPurposesAndAllVendors(), n.enableAllCustomPurposes(), (e.options.googleAdsPreferenceManagement || e.options.googleAdditionalConsentMode) && n.enableMissingCustomPreferences(a)) : r.length && (n.enableVendors(r), n.enableLegIntVendors && n.enableLegIntVendors(r)), e.storeCustomPreferences(n.getCustomPreferences());
                        var s = n.getPreferenceString();
                        e.storeCMPCookie(s), e.state.tcfv2String = s, e.storeCustomPreferences(n.getCustomPreferences()), e.storeCMPChoicePromise.resolve(s), i.resolve(s)
                    }))
                })), i
            }
        }, {
            key: "_waitForCmpWidgetRender",
            value: function() {
                var e = rt();
                return this.ui.cmpWidget.hasBeenRendered() ? e.resolve() : this.ui.cmpWidget.render((function() {
                    e.resolve()
                })), e
            }
        }, {
            key: "_fetchVendorIdsToEnable",
            value: function(e, t) {
                var n = rt();
                if (!t || 1 !== this.options.tcfVersion) return n.resolve([]), n;
                if (e.hasBeenDisplayed()) return n.resolve([]), n;
                var o = e._vendorsJSON,
                    i = ao(t).getVendorListVersion();
                return i >= o.vendorListVersion ? (n.resolve([]), n) : (e.getVendorList(i, (function(e) {
                    for (var t = {}, i = 0; i < o.vendors.length; i++) t[o.vendors[i].id] = !0;
                    for (var a = 0; a < e.vendors.length; a++) delete t[e.vendors[a].id];
                    var r = Object.keys(t).map((function(e) {
                        return +e
                    }));
                    n.resolve(r)
                }), (function() {
                    n.resolve([])
                })), n)
            }
        }, {
            key: "fireConsentCallbacks",
            value: function(e) {
                var t = this;
                this.emit("on-consent-first-given"), this.fireCallback("onConsentFirstGiven", e), "rejectButtonClick" === e && (this.fireCallback("onConsentFirstRejected"), this.fireCallback("onConsentRejected")), this.fireCallback("onPreferenceFirstExpressed", this.consent), this.fireCallback("onPreferenceExpressed", this.consent), this.options.reloadOnConsent && !this.state.consentFoundOnLoad ? this.options.enableTcf ? this.storeCMPChoicePromise.then((function() {
                    t.reloadOrWaitForTimeOut()
                })) : this.reloadOrWaitForTimeOut() : this.applyConsent()
            }
        }, {
            key: "reloadOrWaitForTimeOut",
            value: function() {
                var e = this;
                if (this.state.reloadAfterRemoteSet > 0) {
                    var t = this.options.enableTcf ? this.settings.timeoutBeforeReloadWithCmp : this.settings.timeoutBeforeReload;
                    setTimeout((function() {
                        e.reloadPage()
                    }), t)
                } else this.reloadPage()
            }
        }, {
            key: "setRemoteConfiguration",
            value: function(e) {
                this.state.preLoaded || (this.options = new vn(this.options, e, {
                    fromRemoteConf: !0,
                    floatingPreferencesButtonDisplaySpecified: void 0 !== _iub.csConfiguration.floatingPreferencesButtonDisplay
                }, null, Xn))
            }
        }, {
            key: "setCpOpen",
            value: function(e) {
                this.state.cpOpen !== e && (this.state.cpOpen = e, e ? this.fireCallback("on2ndLayerShown") : this.fireCallback("on2ndLayerClosed"))
            }
        }, {
            key: "version",
            value: function() {
                return Xn.warn("[Deprecation] _iub.cs.version() is deprecated, please use _iub.cs.VERSION instead"), this.settings.version
            }
        }, {
            key: "remoteCookiesSet",
            value: function(e) {
                this.cookie.remoteCookiesSet(e)
            }
        }, {
            key: "pickUpRemoteCookie",
            value: function(e) {
                this.cookie.pickUpRemoteCookie(e)
            }
        }, {
            key: "log",
            value: function(e, t) {
                var n = t.toLowerCase();
                Xn.log(n, e), "error" !== n && "fatal" !== n || ("fatal" === n && (this.state.fatalError = !0), null != e && this.state.errors.push(e))
            }
        }, {
            key: "closeCP",
            value: function() {
                this.ui.closeCPiFrame()
            }
        }, {
            key: "stringEndsWith",
            value: function(e, t) {
                return -1 !== e.indexOf(t, e.length - t.length)
            }
        }, {
            key: "plannedConsent",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.event || "documentClicked",
                    n = !0 === e.force;
                this.isConsentGiven() && !n || (this.consentGiven({
                    global: !0,
                    implicit: !0,
                    eventName: t
                }), this.ui.emit("try-consent-given"), this.ui.removeBanner())
            }
        }, {
            key: "getSavedPreferences",
            value: function() {
                var e = this.fetchCustomPreferences();
                return this.savedPreferences.cmpCookie = this.state.tcfv2String, this.savedPreferences.customPreferences = e, this.savedPreferences
            }
        }, {
            key: "debug",
            value: function(e) {
                this.log(e, "debug")
            }
        }, {
            key: "warn",
            value: function(e) {
                this.log(e, "warn")
            }
        }, {
            key: "error",
            value: function(e) {
                this.log(e, "error"), this.fireCallback("onError", e)
            }
        }, {
            key: "fatal",
            value: function(e) {
                this.log(e, "fatal"), this.fireCallback("onFatalError", e)
            }
        }, {
            key: "info",
            value: function(e) {
                this.log(e, "info")
            }
        }, {
            key: "shouldAcknowledgeCcpaOnLoad",
            value: function() {
                return !this.state.ccpaAcknowledged && (!(this.options.ccpaNoticeDisplay && !this.options.ccpaAcknowledgeOnDisplay) || !!this.options.ccpaAcknowledgeOnLoad)
            }
        }, {
            key: "acknowledgeCcpa",
            value: function(e) {
                var t = this.state.ccpaAcknowledged;
                this.state.ccpaUspStateFound = !0, this.state.ccpaAcknowledged = !0, e && (this.usPrivacyCookie = null, this.state.ccpaOptedOut = !1), this.setCcpaCookie(), t || this.fireCallback("onCcpaFirstAcknowledged"), this.fireCallback("onCcpaAcknowledged")
            }
        }, {
            key: "generateCcpaCookie",
            value: function() {
                var e, t;
                return {
                    uspString: this.getUspString(),
                    firstAcknowledgeDate: (null === (e = this.usPrivacyCookie) || void 0 === e ? void 0 : e.firstAcknowledgeDate) || (this.state.ccpaAcknowledged ? new Date : null),
                    optOutDate: (null === (t = this.usPrivacyCookie) || void 0 === t ? void 0 : t.optOutDate) || (this.state.ccpaOptedOut ? new Date : null)
                }
            }
        }, {
            key: "setCcpaCookie",
            value: function() {
                var e = this.generateCcpaCookie();
                this.cookie.setLocalCookie(this.settings.USPRIVACY_COOKIE, e), this.options.enableRemoteConsent && this.cookie.setRemoteCookie(this.cookie.state.ccpaCookieNameRemote, e), this.usPrivacyCookie = e
            }
        }, {
            key: "getUspString",
            value: function() {
                return this.options.ccpaApplies ? this.state.ccpaUspVersion + (this.state.ccpaAcknowledged ? "Y" : "N") + (this.state.ccpaOptedOut ? "Y" : "N") + this.getLspaValue() : "1---"
            }
        }, {
            key: "getLspaValue",
            value: function() {
                switch (this.options.ccpaLspa) {
                    case !0:
                    case "Y":
                    case "y":
                        return "Y";
                    case !1:
                    case "N":
                    case "n":
                        return "N";
                    default:
                        return "-"
                }
            }
        }, {
            key: "optOutCcpa",
            value: function() {
                var e = this.state.ccpaOptedOut;
                this.state.ccpaUspStateFound = !0, this.state.ccpaAcknowledged = !0, this.state.ccpaOptedOut = !0, this.setCcpaCookie(), e || this.fireCallback("onCcpaFirstOptOut"), this.fireCallback("onCcpaOptOut")
            }
        }, {
            key: "acceptAllPurposeConsent",
            value: function() {
                (this.options.gdprApplies || this.options.lgpdApplies) && (this.options.perPurposeConsent && this.purposesPreference.express(this.purposes.toIDArray(), !0), this.consent = this.getConsentObj(!0), this.cookie.storeConsent())
            }
        }, {
            key: "acceptAllTcf",
            value: function() {
                var e = this,
                    t = rt();
                return !this.options.enableTcf || this.options.skipSaveConsent ? t.resolve() : (this.updateTcfApi(!0, this.state.tcfv2String), st([this.startCmpWidget(), this._waitForCmpWidgetRender()]).then((function() {
                    var n = e.ui.cmpWidget;
                    n.enableAllPurposesAndAllVendors(), n.enableAllCustomPurposes();
                    var o = e.options;
                    o.googleAdditionalConsentMode && o.perPurposeConsent && n.acEnableEntities(!0), e.storeCustomPreferences(n.getCustomPreferences());
                    var i = n.getPreferenceString();
                    e.storeCMPCookie(i), e.state.tcfv2String = i, e.updateTcfApi(!1, e.state.tcfv2String), t.resolve(i)
                })), t)
            }
        }, {
            key: "acceptAll",
            value: function(e) {
                var t = this;
                this.options.ccpaApplies && this.acknowledgeCcpa(), this.acceptAllPurposeConsent(), this.acceptAllTcf().then((function() {
                    t.fireConsentCallbacks(e)
                })), "documentClicked" !== e && this.tracker.consentGiven(e)
            }
        }]), e
    }();

    function uo() {
        var e = "https://cdn.iubenda.com/cs/tcf/versions/tcf-v2-0.20.0.js";
        return "Symbol" in window && "assign" in Object && "values" in Object && "entries" in Object && "isInteger" in Number || (e = e.replace(/(.*)\/tcf-v2(.*?\.js)/, "$1/tcf-v2-polyfilled$2")), e
    }

    function ho(e) {
        var t = rt(),
            n = document.createElement("script");
        return n.src = e, n.onload = function() {
            t.resolve()
        }, document.head.appendChild(n), t
    }

    function mo() {
        var e = rt().resolve();
        return function() {
            try {
                return "consentState" in JSON.parse(window.name)
            } catch (e) {
                return !1
            }
        }() && (e = ho("https://cdn.iubenda.com/cookie_solution/versions/cs_amp-1.3.0.js")), e
    }
    new(function() {
        function t(e) {
            i(this, t), this.csConfiguration = e, _iub.csLoaded || (_iub.csLoaded = !0, this.init())
        }
        return r(t, [{
            key: "init",
            value: function() {
                var t = this;
                mo().then((function() {
                    _iub.jlib.promise = _iub.jlib.promise || {
                        create: rt
                    }, t.logger = t.startLogger();
                    try {
                        ! function() {
                            if (!e.en) {
                                var t = Object.keys(e)[0],
                                    n = e[t];
                                _iub.csConfiguration && _iub.csConfiguration.i18n && _iub.csConfiguration.i18n.en && (n = g({}, n)), e.en = n
                            }
                        }(), t.csConfiguration = t.getSafeConfiguration(), t.cmpLibraryPromise = t.getCmpLibraryPromise(), t.createInstance()
                    } catch (e) {
                        t.handleStartupFailure(e)
                    }
                }))
            }
        }, {
            key: "startLogger",
            value: function() {
                var e = b,
                    t = this.getLoggerConfig(),
                    n = t.loggerName,
                    o = t.logLevel;
                return e.use(n), e.setLevel(o), e
            }
        }, {
            key: "getLoggerConfig",
            value: function() {
                return {
                    loggerName: this.csConfiguration.logger || un.logger,
                    logLevel: this.csConfiguration.logLevel || un.logLevel
                }
            }
        }, {
            key: "getSafeConfiguration",
            value: function() {
                this.csConfiguration || this.logger.warn("_iub.csConfiguration NOT found");
                var e = new vn(un, this.csConfiguration, null, null, this.logger);
                return e.check(un, this.csConfiguration), e
            }
        }, {
            key: "getCmpLibraryPromise",
            value: function() {
                var e = rt().resolve();
                this.isConfigurationTcfEnabled() && (e = ho(uo()));
                return e
            }
        }, {
            key: "isConfigurationTcfEnabled",
            value: function() {
                return !(!this.csConfiguration.enableTcf && !this.csConfiguration.enableCMP)
            }
        }, {
            key: "loadDom",
            value: function() {
                var e = rt();
                return this.csConfiguration.startOnDomReady ? he((function() {
                    return e.resolve()
                })) : Q((function() {
                    return e.resolve()
                }), !1), e
            }
        }, {
            key: "preLoadCS",
            value: function() {
                var e = this;
                this.cmpLibraryPromise.then((function() {
                    e.loadDom().then((function() {
                        try {
                            _iub.cs.preLoad()
                        } catch (t) {
                            e.handleStartupFailure(t)
                        }
                    }))
                }))
            }
        }, {
            key: "createInstance",
            value: function() {
                _iub.cs = new lo(this.csConfiguration, "1.43.0", this.cmpLibraryPromise, this.logger), cn.install(_iub.cs, this.csConfiguration, this.logger), dn(_iub, this.handleStartupFailure.bind(this), this.preLoadCS.bind(this))
            }
        }, {
            key: "handleStartupFailure",
            value: function(e) {
                var t, n, o;
                null === (t = this.csConfiguration) || void 0 === t || null === (n = t.callback) || void 0 === n || null === (o = n.onStartupFailed) || void 0 === o || o.call(n, e.message || e), this.logger.error("Cookie Solution startup failed", e)
            }
        }]), t
    }())(_iub.csConfiguration)
}();