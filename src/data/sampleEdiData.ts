import { EdiTransactionSample } from '../types/video';

export const SAMPLE_EDI_TRANSACTIONS: Record<string, EdiTransactionSample> = {
  '820': {
    id: '820',
    code: 'EDI 820',
    title: 'Payroll Deducted and Group Premium Payment / Remittance',
    purpose: 'Transmits premium payment order and detailed remittance advice from employers or state Medicaid agencies to healthcare payers and capitated provider networks.',
    sender: 'Employer Group / State Medicaid Agency (e.g., ODM)',
    receiver: 'Managed Care Health Plan / Provider Network',
    rawEdi: `ISA*00*          *00*          *ZZ*ACMEPAYROLL    *ZZ*HEALTHPLAN01   *261008*1430*U*00501*000000123*0*P*>~
GS*RA*ACMEPAYROLL*HEALTHPLAN01*20261008*1430*123*X*005010X218~
ST*820*000123~
BPR*C*14580.00*C*ACH*CTX*01*123456789*DA*987654321*1999999999**01*987654321*DA*123456789*20261015~
TRN*1*CHK-2026-10-8201*1999999999~
N1*PR*ACME CORP PREMIUM TRUST*FI*123456789~
N1*PE*HORIZON BLUE HEALTH PLAN*FI*987654321~
ENT*1~
RMR*IV*POL-98234-A**1250.00*1250.00~
REF*11*OCT2026PREM~
ENT*2~
RMR*IV*POL-98234-B**1420.00*1420.00~
REF*11*OCT2026PREM~
SE*12*000123~
GE*1*123~
IEA*1*000000123~`,
    segments: [
      {
        tag: 'ISA',
        name: 'Interchange Control Header',
        loopLevel: 'Envelope (Outer)',
        mandatory: true,
        snipValidationLevel: 1,
        description: 'Defines the start of an interchange, communication partners, control dates, and interchange control number.',
        elements: [
          { code: 'ISA06', label: 'Sender ID', value: 'ACMEPAYROLL' },
          { code: 'ISA08', label: 'Receiver ID', value: 'HEALTHPLAN01' },
          { code: 'ISA13', label: 'Interchange Control #', value: '000000123', note: 'Must match IEA02 exactly' },
        ],
      },
      {
        tag: 'GS',
        name: 'Functional Group Header',
        loopLevel: 'Functional Group',
        mandatory: true,
        snipValidationLevel: 1,
        description: 'Groups related transaction sets of the same type (RA = Payment Order/Remittance).',
        elements: [
          { code: 'GS01', label: 'Functional ID', value: 'RA (Payment Order/Remittance)' },
          { code: 'GS06', label: 'Group Control #', value: '123', note: 'Must match GE02 exactly' },
          { code: 'GS08', label: 'Version / Release', value: '005010X218', note: 'HIPAA 5010 820 standard' },
        ],
      },
      {
        tag: 'ST',
        name: 'Transaction Set Header',
        loopLevel: 'Transaction Set',
        mandatory: true,
        snipValidationLevel: 1,
        description: 'Indicates the start of the 820 transaction and sets the unique transaction control number.',
        elements: [
          { code: 'ST01', label: 'Transaction Set ID', value: '820' },
          { code: 'ST02', label: 'Control Number', value: '000123', note: 'Critical rule: ST02 MUST EQUAL SE02' },
        ],
      },
      {
        tag: 'BPR',
        name: 'Beginning Segment for Payment Order / Remittance',
        loopLevel: 'Header',
        mandatory: true,
        snipValidationLevel: 2,
        description: 'Contains financial transaction handling, total dollar payment, payment method (ACH), and bank account routing.',
        elements: [
          { code: 'BPR01', label: 'Transaction Handling', value: 'C (Payment Accompanies)' },
          { code: 'BPR02', label: 'Total Amount', value: '$14,580.00' },
          { code: 'BPR04', label: 'Payment Format', value: 'ACH (Automated Clearing House)' },
          { code: 'BPR05', label: 'Format Code', value: 'CTX (Corporate Trade Exchange)' },
          { code: 'BPR16', label: 'Effective Date', value: '2026-10-15' },
        ],
      },
      {
        tag: 'TRN',
        name: 'Trace Number',
        loopLevel: 'Header',
        mandatory: true,
        snipValidationLevel: 2,
        description: 'Links this EDI 820 remittance advice directly to the bank electronic funds transfer (EFT) trace number for reconciliation.',
        elements: [
          { code: 'TRN01', label: 'Trace Type', value: '1 (Current Transaction)' },
          { code: 'TRN02', label: 'Reference ID', value: 'CHK-2026-10-8201' },
          { code: 'TRN03', label: 'Originating Company ID', value: '1999999999' },
        ],
      },
      {
        tag: 'ENT',
        name: 'Entity Loop',
        loopLevel: 'Loop 2000',
        mandatory: true,
        snipValidationLevel: 3,
        description: 'Identifies the individual subscriber, employee group, or sub-entity being funded under this premium payment.',
        elements: [
          { code: 'ENT01', label: 'Assigned Number', value: '1' },
        ],
      },
      {
        tag: 'RMR',
        name: 'Remittance Advice Accounts Receivable Detail',
        loopLevel: 'Loop 2300',
        mandatory: true,
        snipValidationLevel: 3,
        description: 'Specifies the invoice, member policy number, total due, and exact amount being satisfied.',
        elements: [
          { code: 'RMR01', label: 'Qualifier', value: 'IV (Invoice/Policy)' },
          { code: 'RMR02', label: 'Invoice/Policy #', value: 'POL-98234-A' },
          { code: 'RMR04', label: 'Amount Paid', value: '$1,250.00' },
          { code: 'RMR05', label: 'Original Invoiced', value: '$1,250.00' },
        ],
      },
      {
        tag: 'SE',
        name: 'Transaction Set Trailer',
        loopLevel: 'Transaction Set',
        mandatory: true,
        snipValidationLevel: 1,
        description: 'Closes the 820 transaction, stating total segment count and confirming the control number.',
        elements: [
          { code: 'SE01', label: 'Number of Segments', value: '12' },
          { code: 'SE02', label: 'Control Number', value: '000123', note: 'Validated against ST02' },
        ],
      },
    ],
    commonErrors: [
      'ST02 != SE02 Control Number Mismatch (Causes fatal rejection)',
      'BPR02 dollar amount does not equal sum of RMR04 line items (SNIP Level 3 Balance Error)',
      'Missing TRN trace number preventing automated bank reassociation with CTX deposit',
      'ISA06 or ISA08 receiver qualifier invalid for trading partner profile',
    ],
  },
  '837P': {
    id: '837P',
    code: 'EDI 837P',
    title: 'Health Care Claim: Professional (CMS-1500 / 837P)',
    purpose: 'Standard electronic format for physicians, nurse practitioners, and outpatient medical practices to bill health plans for professional clinical services.',
    sender: 'Healthcare Provider / Billing Service',
    receiver: 'Clearinghouse / Commercial Health Plan / Medicare MAC',
    rawEdi: `ISA*00*          *00*          *ZZ*CLINICPROV01   *ZZ*CLEARINGHUB01  *261008*0915*U*00501*000004581*0*P*>~
GS*HC*CLINICPROV01*CLEARINGHUB01*20261008*0915*4581*X*005010X222A1~
ST*837*0001~
BHT*0019*00*CLM20261008-01*20261008*0915*CH~
NM1*41*2*VALLEY MEDICAL ASSOCIATES*****46*123456789~
PER*IC*BILLING DEPT*TE*5552345678~
NM1*40*2*HEALTH CONNECT CLEARINGHOUSE*****46*987654321~
HL*1**20*1~
NM1*85*2*VALLEY MEDICAL CLINIC*****XX*1982736450~
N3*450 HEALING WAY*SUITE 200~
N4*COLUMBUS*OH*43215~
HL*2*1*22*0~
NM1*IL*1*SMITH*JANE****MI*W1234567801~
N3*12 MAPLE AVENUE~
N4*COLUMBUS*OH*43215~
DMG*D8*19840512*F~
CLM*CLM-2026-9912*245.00***11:B:1*Y*A*Y*Y~
HI*BK:I10*BF:E119~
LX*1~
SV1*HC:99214*185.00*UN*1***1:2~
DTP*472*D8*20261005~
LX*2~
SV1*HC:36415*60.00*UN*1***1~
DTP*472*D8*20261005~
SE*23*0001~
GE*1*4581~
IEA*1*000004581~`,
    segments: [
      {
        tag: 'BHT',
        name: 'Beginning of Hierarchical Transaction',
        loopLevel: 'Header',
        mandatory: true,
        snipValidationLevel: 2,
        description: 'Defines claim purpose code (00 = Original), provider internal reference ID, and transaction date.',
        elements: [
          { code: 'BHT01', label: 'Structure Code', value: '0019 (Information Source)' },
          { code: 'BHT02', label: 'Purpose Code', value: '00 (Original)' },
          { code: 'BHT03', label: 'Reference ID', value: 'CLM20261008-01' },
          { code: 'BHT06', label: 'Claim Type', value: 'CH (Chargeable)' },
        ],
      },
      {
        tag: 'NM1*85',
        name: 'Billing Provider Name',
        loopLevel: 'Loop 2010AA',
        mandatory: true,
        snipValidationLevel: 2,
        description: 'Mandatory provider identification including 10-digit National Provider Identifier (NPI) in NM109.',
        elements: [
          { code: 'NM101', label: 'Entity Identifier', value: '85 (Billing Provider)' },
          { code: 'NM102', label: 'Entity Type', value: '2 (Non-Person / Organization)' },
          { code: 'NM108', label: 'ID Code Qualifier', value: 'XX (National Provider Identifier - NPI)' },
          { code: 'NM109', label: 'NPI Number', value: '1982736450' },
        ],
      },
      {
        tag: 'CLM',
        name: 'Claim Level Data',
        loopLevel: 'Loop 2300',
        mandatory: true,
        snipValidationLevel: 2,
        description: 'Master claim record including Patient Control Number, total billed charge, and place of service.',
        elements: [
          { code: 'CLM01', label: 'Patient Control #', value: 'CLM-2026-9912' },
          { code: 'CLM02', label: 'Total Billed Amount', value: '$245.00' },
          { code: 'CLM05-1', label: 'Place of Service', value: '11 (Office)' },
          { code: 'CLM05-2', label: 'Claim Frequency', value: '1 (Original)' },
        ],
      },
      {
        tag: 'HI',
        name: 'Health Care Information Codes (Diagnoses)',
        loopLevel: 'Loop 2300',
        mandatory: true,
        snipValidationLevel: 5,
        description: 'Primary and secondary diagnosis codes in ICD-10-CM format. BK qualifier denotes principal ICD-10.',
        elements: [
          { code: 'HI01-1', label: 'Principal Qualifier', value: 'BK (ICD-10-CM)' },
          { code: 'HI01-2', label: 'Diagnosis Code', value: 'I10 (Essential Hypertension)' },
          { code: 'HI02-1', label: 'Secondary Qualifier', value: 'BF (ICD-10-CM)' },
          { code: 'HI02-2', label: 'Diagnosis Code', value: 'E119 (Type 2 Diabetes)' },
        ],
      },
      {
        tag: 'SV1',
        name: 'Professional Service Line',
        loopLevel: 'Loop 2400',
        mandatory: true,
        snipValidationLevel: 3,
        description: 'Individual CPT/HCPCS procedure code, billed line charge, unit count, and pointer to diagnosis in HI segment.',
        elements: [
          { code: 'SV101-2', label: 'CPT Procedure Code', value: '99214 (Office Visit Established High)' },
          { code: 'SV102', label: 'Line Charge', value: '$185.00' },
          { code: 'SV103', label: 'Unit Qualifier', value: 'UN (Units)' },
          { code: 'SV104', label: 'Units', value: '1' },
          { code: 'SV107', label: 'Diagnosis Pointers', value: '1:2 (Points to I10 and E119)' },
        ],
      },
    ],
    commonErrors: [
      'Sum of SV1 line charges ($185 + $60 = $245) does not match CLM02 ($245)',
      'Invalid NPI check-digit algorithm in NM109 (SNIP 2 failure)',
      'Service date DTP472 is later than transaction date BHT04 (Future service date rejection)',
      'Invalid diagnosis pointer (pointing to HI index 3 when only 2 diagnoses exist)',
    ],
  },
  '835': {
    id: '835',
    code: 'EDI 835',
    title: 'Health Care Claim Payment / Advice (ERA - Electronic Remittance Advice)',
    purpose: 'Notifies healthcare provider of claim adjudication decisions, allowed amounts, contractual adjustments, patient responsibility, and payment settlement.',
    sender: 'Health Plan / Payer Adjudication Engine',
    receiver: 'Healthcare Provider / Practice Management System',
    rawEdi: `ISA*00*          *00*          *ZZ*PAYER999       *ZZ*CLINICPROV01   *261012*1600*U*00501*000008921*0*P*>~
GS*HP*PAYER999*CLINICPROV01*20261012*1600*8921*X*005010X221A1~
ST*835*008921~
BPR*I*165.00*C*ACH*CCP*01*021000021*DA*11223344*1999999999**01*041000124*DA*99887766*20261014~
TRN*1*ERA-ACH-778899*1999999999~
N1*PR*BLUE CROSS SHIELD NATIONAL~
N1*PE*VALLEY MEDICAL CLINIC*XX*1982736450~
CLP*CLM-2026-9912*1*245.00*165.00*30.00*MC*CLAIM99214PAYER*11*1~
CAS*CO*45*50.00~
CAS*PR*1*30.00~
SVC*HC:99214*185.00*135.00**1~
CAS*CO*45*35.00~
CAS*PR*1*15.00~
SVC*HC:36415*60.00*30.00**1~
CAS*CO*45*15.00~
CAS*PR*1*15.00~
SE*18*008921~
GE*1*8921~
IEA*1*000008921~`,
    segments: [
      {
        tag: 'BPR',
        name: 'Financial Information Header',
        loopLevel: 'Header',
        mandatory: true,
        snipValidationLevel: 2,
        description: 'Contains paid dollar amount ($165.00), ACH delivery method, and bank ABA routing for provider auto-reconciliation.',
        elements: [
          { code: 'BPR01', label: 'Payment Method Code', value: 'I (Remittance Information Only / Separate EFT)' },
          { code: 'BPR02', label: 'Total Paid', value: '$165.00' },
          { code: 'BPR04', label: 'Payment Format', value: 'ACH' },
          { code: 'BPR16', label: 'Check/EFT Date', value: '2026-10-14' },
        ],
      },
      {
        tag: 'CLP',
        name: 'Claim Payment Information',
        loopLevel: 'Loop 2100',
        mandatory: true,
        snipValidationLevel: 2,
        description: 'Summarizes adjudication of a single claim: Billed ($245), Paid ($165), Patient Responsibility ($30), Claim Status (1 = Primary).',
        elements: [
          { code: 'CLP01', label: 'Patient Control #', value: 'CLM-2026-9912' },
          { code: 'CLP02', label: 'Claim Status Code', value: '1 (Processed as Primary)' },
          { code: 'CLP03', label: 'Total Claim Charge', value: '$245.00' },
          { code: 'CLP04', label: 'Claim Payment Amount', value: '$165.00' },
          { code: 'CLP05', label: 'Patient Responsibility', value: '$30.00' },
        ],
      },
      {
        tag: 'CAS',
        name: 'Claims Adjustment Segment (CARC Codes)',
        loopLevel: 'Loop 2110',
        mandatory: true,
        snipValidationLevel: 3,
        description: 'Explains financial differences between billed amount and paid amount using Claim Adjustment Group & Reason codes.',
        elements: [
          { code: 'CAS01', label: 'Claim Adjustment Group', value: 'CO (Contractual Obligation / Write-off)' },
          { code: 'CAS02', label: 'CARC Reason Code', value: '45 (Charge exceeds fee schedule / maximum allowable)' },
          { code: 'CAS03', label: 'Adjustment Amount', value: '$50.00' },
        ],
      },
      {
        tag: 'CAS (Patient)',
        name: 'Patient Responsibility Adjustment',
        loopLevel: 'Loop 2110',
        mandatory: false,
        snipValidationLevel: 3,
        description: 'Assigns balance to patient deductible, coinsurance, or copayment.',
        elements: [
          { code: 'CAS01', label: 'Group Code', value: 'PR (Patient Responsibility)' },
          { code: 'CAS02', label: 'CARC Code', value: '1 (Deductible Amount)' },
          { code: 'CAS03', label: 'Amount', value: '$30.00' },
        ],
      },
    ],
    commonErrors: [
      'Out of Balance: Paid ($165) + CO-45 ($50) + PR-1 ($30) must equal Billed ($245)',
      'TRN trace number mismatch between 835 and bank ACH file preventing automated posting',
      'Missing CARC or RARC codes when service line payment is reduced or denied',
    ],
  },
  '270_271': {
    id: '270_271',
    code: 'EDI 270 / 271',
    title: 'Health Care Eligibility Benefit Inquiry and Response',
    purpose: 'Real-time inquiry from provider at registration and response from payer stating active coverage, deductibles, copays, and benefit limits.',
    sender: 'Provider Front Desk / EHR (270) <--> Payer Real-time Gateway (271)',
    receiver: 'Payer Real-time Gateway (270) <--> Provider EHR (271)',
    rawEdi: `ISA*00*          *00*          *ZZ*CLINICPROV01   *ZZ*PAYER999       *261008*0800*U*00501*000001111*0*P*>~
GS*HB*CLINICPROV01*PAYER999*20261008*0800*1111*X*005010X279A1~
ST*271*0001~
BHT*0022*11*REQ-ELIG-099*20261008*0800~
HL*1**20*1~
NM1*PR*2*BLUE CROSS SHIELD*****PI*PAYER999~
HL*2*1*21*1~
NM1*1P*2*VALLEY MEDICAL CLINIC*****XX*1982736450~
HL*3*2*22*0~
NM1*IL*1*SMITH*JANE****MI*W1234567801~
EB*1**30*PR**10.00~
EB*C*IND*30*PR**250.00*500.00~
EB*B**30*PR**25.00~
SE*14*0001~
GE*1*1111~
IEA*1*000001111~`,
    segments: [
      {
        tag: 'EB*1',
        name: 'Eligibility or Benefit Information - Active Coverage',
        loopLevel: 'Loop 2110C',
        mandatory: true,
        snipValidationLevel: 2,
        description: 'Indicates member has active general medical coverage (Service Type 30 = Health Benefit Plan Coverage).',
        elements: [
          { code: 'EB01', label: 'Eligibility Code', value: '1 (Active Coverage)' },
          { code: 'EB03', label: 'Service Type Code', value: '30 (General Medical / Health Benefit Plan)' },
          { code: 'EB04', label: 'Insurance Type', value: 'PR (Preferred Provider Organization - PPO)' },
        ],
      },
      {
        tag: 'EB*C',
        name: 'Deductible Tracking',
        loopLevel: 'Loop 2110C',
        mandatory: false,
        snipValidationLevel: 3,
        description: 'Shows total deductible ($500.00) and remaining deductible unsatisfied ($250.00).',
        elements: [
          { code: 'EB01', label: 'Code', value: 'C (Deductible)' },
          { code: 'EB02', label: 'Coverage Level', value: 'IND (Individual)' },
          { code: 'EB07', label: 'Remaining Deductible', value: '$250.00' },
          { code: 'EB08', label: 'Total Deductible', value: '$500.00' },
        ],
      },
      {
        tag: 'EB*B',
        name: 'Copayment Requirement',
        loopLevel: 'Loop 2110C',
        mandatory: false,
        snipValidationLevel: 2,
        description: 'Fixed copayment amount due at the time of the provider visit.',
        elements: [
          { code: 'EB01', label: 'Code', value: 'B (Co-Payment)' },
          { code: 'EB07', label: 'Amount', value: '$25.00' },
        ],
      },
    ],
    commonErrors: [
      'Patient demographic mismatch: Name or DOB in 270 does not match payer member master file',
      'Inquiry for terminated policy number returns EB01 = 6 (Inactive)',
      'Service Type Code (STC) omitted, triggering generic default instead of specialty benefits',
    ],
  },
};
