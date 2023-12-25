export const MEDIA_QUERY_LOAN_INFORMATION_PRIMARY_APPLICANT_COLUMNS_LAYOUT = '@media screen and (min-width: 440px) and (max-width: 845px)';

export const SUMMARY_RESPONSIVE_CONTAINER = 'summary-responsive-container';

export const MEDIA_SCREEN_S_TABLE_BREAK_POINT = '@media screen and (max-width: 500px)';

export const MEDIA_SCREEN_XS_TABLE_BREAK_POINT = '@media screen and (max-width: 350px)';

export const APPLICANT_QUERY_CONDITION_TEMPLATE = '<condition attribute="msfsi_loanapplicationid" operator="eq" value="{LOAN_ID}" />';

/* NOTE: 
 The same media query break point is also defined in `msfsi_LoanApplicationFormOnLoad.js` -> `this.formOnLoad`.
 Changing this break point you will also have to change the @media query break point in `msfsi_LoanApplicationFormOnLoad.js` -> `this.formOnLoad`
 */
export const MEDIA_QUERY_BREAKPOINT_SMALL = '1000px';
