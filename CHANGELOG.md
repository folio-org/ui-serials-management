# change history for ui-serials-management

## 1.2.0 IN PROGRESS

## 1.1.2 2025-01-09
  * UISER-161 Enable support for serials to create receiving pieces in ECS environments with central ordering
  * Updated translations

## 1.1.1 2024-11-29
  * UISER-174 In Generated predicted piece confirmation warning the wrong date is used
  * UISER-172 Receiving pieces for combined pieces do not include correct display summary
  * UISER-178 Non-existant permission referenced in ui-serials-management leading to no permission to delete a predicted piece set
  * MODSER-62 Multiple levels of continuous enumeration in a publication pattern result in incorrect numbering

## 1.1.0 2024-11-01
  * UISER-167 Update module license and guidance for ui-serials-management
  * UISER-166 Update permissions and menu display for serials
  * UISER-165 Update permissions and menu display for predicted piece sets
  * UISER-164 Only users with permission ui-serials-management.serials.edit should see the "New" button for Serials
  * UISER-163 Review and cleanup Module Descriptor for UI-Serials-Management (Eureka)
  * UISER-158 Handle display of sparse order-line objects
  * UISER-155 Deleted predicted piece set
  * UISER-153 Support edit for publication patterns
  * UISER-151 Validation messages on the "Number of time units" field are not being displayed
  * UISER-150 Fix inconsistencies in the module descriptors for folio_serials-management-1.1
  * UISER-149 Serials/Receiving: Combination issues do not include expected receipt date
  * UISER-148 Warn user if they are going to create a predicted piece set with the same start date as an existing predicted piece set
  * UISER-147 Change preview window title
  * UISER-144 Dropdowns in Publication Pattern labels slow to respond
  * UISER-141 View publication pattern
  * UISER-140 Aria labels in publication pattern should be translatable
  * UISER-138 Aria label missing for publication pattern numeric day field
  * UISER-135 Holdings storage API version update
  * UISER-114 Display publisher information in the serial view
  * UISER-107 Display tokens for enumeration/chronology in the label
  * UISER-91 On generating predicted pieces, if the active ruleset has previously been used, then the form should populate with the next set of starting values
  * UISER-15 UX review: view serial record
  * UISER-6 Edit publication pattern
  * MODSER-58 Attempting to generate piece sets with the first or next piece being omitted results in "Cannot get naive index of internal omission piece"
  * MODSER-57 Refactor generate/create piece set endpoints to return same objects
  * MODSER-54 Combination pieces do not get allocated a `date`
  * ERM-3184 Number validation does not allow entry of minus sign or 'e' (exponential) in supplementary props/license terms
    * Use shared NumberField component from kint-components
  * ERM-3165 Replace moment with dayjs across app suite
  * FOLIO-4086 Fix GitHub Actions workflow not running for tags

## 1.0.5 2024-08-23
  * UISER-129 Add "Create item" checkbox to "Generate in receiving" dialog

## 1.0.4 2024-05-15
  * UISER-133 Permissions not renamed in line with updated backend perms

## 1.0.3 2024-05-10
  * UISER-31 Missing permission serials-management.locales.collection.get from module.serials-management.enabled perm set
  * Translations

## 1.0.2 2024-04-26
  * UISER-27 Ensure meaningful aria labels are in place to uniquely identify repeated fields
  * Translations

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
