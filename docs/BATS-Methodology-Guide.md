# B.A.T.S. Methodology Guide

## Overview
The Block Audit Tracing Standard (B.A.T.S.) provides a systematic approach to cryptocurrency investigation that maintains mathematical precision while adapting to real-world investigative challenges.

## Core Methodology Components

### 1. Initial Setup and Root Total Establishment

#### Case Documentation
- Record all case details including case ID, investigator, and case type
- Document the circumstances leading to asset loss
- Establish clear investigative objectives

#### Victim Transaction Documentation
- Record all victim transactions with complete details:
  - Transaction hash
  - Amount and currency
  - Receiving wallet (RED wallet)
  - Date/time in UTC
  - Transaction notes

#### Root Total Confirmation
- Calculate the total victim losses across all currencies
- Establish the "Root Total" as your mathematical baseline
- This becomes the Adjusted Root Total (ART) after any write-offs

### 2. V-T-H Notation System

The notation system provides unambiguous identification for every traced amount:

```
V[victim#]-T[transaction#]-H[hop#]
```

**Examples:**
- V1-T1: Victim 1, Transaction 1 (at the victim-facing wallet)
- V1-T1-H1: First hop from the victim transaction
- V2-T3-H5: Victim 2, Transaction 3, at 5 hops distance

### 3. Wallet Classification Protocol

#### Color Assignment Rules
1. **First Contact Rule**: Wallets receiving funds directly from victims = RED
2. **Convergence Rule**: Wallets where multiple traces meet = YELLOW
3. **Terminal Rule**: Exchange/service wallets = PURPLE
4. **Storage Rule**: Wallets holding funds long-term = BLUE
5. **Default Rule**: All other wallets = BLACK

#### Classification Permanence
- Once assigned, wallet colors remain permanent
- Document any special characteristics in wallet notes
- Track wallet classification history for legal documentation

### 4. Hop-by-Hop Tracing Process

#### Step 1: Begin at Hop 0 (Victim Transaction)
- Document the RED wallet receiving victim funds
- Establish thread totals for each currency
- Apply V-T notation

#### Step 2: Trace Outbound Transactions (Hop 1)
- Apply PIFO method for transaction selection
- Document all movements from the RED wallet
- Assign hop notation (V-T-H1)
- Track thread totals

#### Step 3: Continue Sequential Tracing
- Follow each thread through subsequent hops
- Maintain hop count consistency
- Document convergences and divergences
- Apply color classifications

#### Step 4: Validate at Each Level
- Sum all thread totals at each hop level
- Verify against Adjusted Root Total
- Identify and investigate discrepancies

### 5. Mathematical Validation Framework

#### Root Validation Process
```
For each hop level:
  Sum(all thread totals) = Adjusted Root Total

If discrepancy found:
  Investigation Gap = ART - Sum(thread totals)
  Locate missing trace paths
```

#### Thread Assignment Rules
- Each outbound transaction must have a source
- Sources must have sufficient available amounts
- Document all assignments clearly
- Maintain chronological integrity

### 6. Convergence Handling

#### The Sequential Hop Rule
When traces converge:
1. Identify all incoming thread IDs
2. Determine highest hop count among them
3. Assign (highest + 1) to outbound transaction
4. Document convergence point

**Example:**
- V1-T1-H3 (1 BTC) + V2-T1-H5 (2 BTC) → Combined H6 (3 BTC)

### 7. Write-off Procedures

#### Justified Write-offs
Document and subtract from root total for:
- **Dust amounts**: Below investigation threshold
- **Extreme dilution**: <1% of large transactions
- **Technical barriers**: Mixers, privacy coins
- **Operational limits**: Resource constraints

#### Write-off Documentation
- Specify exact amount and currency
- Note hop level and thread ID
- Provide clear justification
- Update Adjusted Root Total

### 8. Terminal Wallet Processing

#### Exchange Deposits (PURPLE Wallets)
- Document exchange identification
- Note deposit amounts and dates
- Prepare subpoena/warrant information
- Mark as investigation terminal point

#### Cold Storage (BLUE Wallets)
- Document storage amounts
- Set up monitoring for future movement
- Note as temporary terminal point
- Maintain in investigation scope

## Quality Control Checklist

### At Each Hop Level:
- [ ] All thread sources documented
- [ ] Thread totals sum to ART
- [ ] Wallet colors assigned
- [ ] Convergences documented
- [ ] Write-offs justified

### Before Case Completion:
- [ ] All terminal points identified
- [ ] Root validation complete
- [ ] Documentation standardized
- [ ] Export formats verified
- [ ] Legal requirements met

## Common Pitfalls and Solutions

### Pitfall 1: Scope Creep
**Problem**: Investigation expands beyond traced amounts
**Solution**: Strict adherence to thread totals and ART

### Pitfall 2: Lost Golden Thread
**Problem**: Cannot prove connection to victim funds
**Solution**: Maintain complete hop documentation

### Pitfall 3: Convergence Confusion
**Problem**: Incorrect hop counting at convergence
**Solution**: Apply Sequential Hop Rule consistently

### Pitfall 4: Incomplete Validation
**Problem**: Thread totals don't sum to ART
**Solution**: Systematic gap investigation

## Advanced Techniques

### Multi-Currency Handling
- Track each currency separately
- Validate totals by currency
- Document conversions explicitly
- Maintain currency-specific ARTs

### Batch Transaction Processing
- Group related transactions
- Maintain individual thread tracking
- Apply consistent hop counting
- Document batch rationale

### Network Analysis Integration
- Use YELLOW wallets to identify networks
- Document common control evidence
- Map criminal infrastructure
- Support conspiracy charges