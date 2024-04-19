# change history for ui-serials-management

## 1.0.1 2024-04-19
  * UISER-127 In the CHRONOLOGY_MONTH_FORMAT, October should be the 10th month, not 8th
  * UISER-126 Label starting value fields in preview form are repeated on preview
  * UISER-123 Improve information and feedback to user when generating receiving pieces
  * UISER-119 Resolve SonarQube code smells
  * UISER-115 Where enumeration labels have been defined, starting values for each enumeration level should be required before previewing or generating pieces
  * UISER-113 Support using different languages for chronologies when generating predicted pieces
  * UISER-112 Add linked title to Serial display and Predicted piece set display
  * UISER-109 Targeted tests for UI Serials Management
  * UISER-105 Add "info" icon to Template 
  * UISER-104 Template should appear below labels in Publication Pattern form
  * UISER-100 Add Notes to Serials view pane
  * UISER-99 Level 1 number not used correctly in predicted piece preview from Create Publication Pattern
  * UISER-95 Add refdata view permissions to module enabled permission set so all users can view reference data
  * UISER-90 Identifiers of receiving pieces should be stored with the predicted pieces that generated them and displays should reflect this
  * UISER-87 Pattern ID (rulesetNumber) not being populated on adding a publication pattern
  * UISER-85 Add link from predicted piece set back to Serial record
  * UISER-82 Title does not display in predicted piece set search and sort
  * UISER-80 On editing a serial which is linked to a POL with multiple titles the previously selected title should show as selected
  * UISER-78 Corrections to publication pattern display in serials view
  * UISER-13 UX updates: New/Edit Serial
  * Translations
  * Updated formatJS dependency

## 1.0.0 2024-03-22
  * Initial release for UI module ui-serials-management
  * Manage objects relating to the concept of a "serial"
  * Manage rulesets governing the publication behaviour of a serial
  * Generation of predicted pieces from serial ruleset
    * Local internal piece management
    * Push internal pieces into receiving module
  * JIRA Epic:
    * UXPROD-4437	Initial support for serials including prediction patterns and issue generation
  * JIRA Feature Tickets:
    * UXPROD-4386	Serial publication pattern: basic creation, view
    * UXPROD-4385	Support Enumeration and Chronology for serials management
    * UXPROD-4383	Support for specifying issue frequency for serials
    * UXPROD-4382	Support for a 'serial' record
    * UXPROD-4379	Serials publication pattern UX enhancements
    * UXPROD-4378	Create receiving pieces for predicted serial pieces
    * UXPROD-4352	Create predicted pieces
    * UXPROD-4349	Serial publication patterns: support issue omissions and combinations
