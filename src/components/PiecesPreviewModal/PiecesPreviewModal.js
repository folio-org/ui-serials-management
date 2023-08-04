import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy } from '@folio/stripes/core';
import { FormModal } from '@k-int/stripes-kint-components';
import {
  Datepicker,
  Row,
  Col,
  ModalFooter,
  Button,
  MultiColumnList,
  FormattedDate,
} from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';

import { useState } from 'react';
import { GENERATE_PIECES_PREVIEW } from '../../constants/endpoints';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  ruleset: PropTypes.object,
};

const PiecesPreviewModal = ({ showModal, setShowModal, ruleset }) => {
  const ky = useOkapiKy();
  const [predictedPieces, setPredictedPieces] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setPredictedPieces(null);
  };

  const { mutateAsync: generatePieces } = useMutation(
    ['ui-serials-management', 'PiecesPreviewModal', 'generatePreview'],
    (data) => ky
      .post(GENERATE_PIECES_PREVIEW, { json: data })
      .json()
      .then((res) => setPredictedPieces(res))
  );

  const submitRecurrence = async (values) => {
    const submitValues = {
      ...ruleset,
      startDate: values?.startDate,
    };
    submitValues?.recurrence?.rules?.forEach((e) => {
      // If no ordinal specified, assume ordinal is 1 for all rules
      if (!e?.ordinal) {
        e.ordinal = '1';
      }
      // If no pattern fields are supplied (in the case of the day time unit)
      // Add anempty pattern object to all rules
      if (!e?.pattern) {
        e.pattern = {};
      }
      e.patternType = submitValues?.patternType;
    });
    await generatePieces(submitValues);
  };

  // The following predicted pieces are currently placeholders for testing
  // Will be replaced with more concrete designs later

  const formatter = {
    issueCount: (e) => {
      return e.rowIndex + 1;
    },
    publicationDate: (e) => {
      if (e?.recurrencePieces) {
        return (
          <>
            <FormattedDate value={e?.recurrencePieces[0].date} />
            <br />
            {`Combined pieces: ${e?.recurrencePieces.length}`}
          </>
        );
      }
      return <FormattedDate value={e?.date} />;
    },
    omitted: (e) => {
      return e?.omissionOrigins && 'Omitted';
    },
  };

  const renderPiecesTable = () => {
    return (
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              issueCount: (
                <FormattedMessage id="ui-serials-management.ruleset.issueCount" />
              ),
              publicationDate: (
                <FormattedMessage id="ui-serials-management.ruleset.issuePublicationDate" />
              ),
              omitted: 'Omitted',
            }}
            contentData={predictedPieces}
            formatter={formatter}
            interactive={false}
            visibleColumns={['issueCount', 'publicationDate', 'omitted']}
          />
        </Col>
      </Row>
    );
  };

  const renderFooter = ({ formState, handleSubmit, handleClose }) => {
    const { invalid, pristine, submitting } = formState;
    return (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          disabled={submitting || invalid || pristine}
          marginBottom0
          onClick={handleSubmit}
          type="submit"
        >
          <FormattedMessage id="ui-serials-management.ruleset.generate" />
        </Button>
        <Button marginBottom0 onClick={handleClose}>
          <FormattedMessage id="ui-serials-management.close" />
        </Button>
      </ModalFooter>
    );
  };

  return (
    <FormModal
      modalProps={{
        onClose: closeModal,
        open: showModal,
        label: (
          <FormattedMessage id="ui-serials-management.ruleset.generatePredictedPieces" />
        ),
        footer: renderFooter,
      }}
      mutators={arrayMutators}
      onSubmit={submitRecurrence}
    >
      <Row>
        <Col xs={4}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            label={
              <FormattedMessage id="ui-serials-management.ruleset.startDate" />
            }
            name="startDate"
            required
            usePortal
            validate={requiredValidator}
          />
        </Col>
      </Row>
      {!!predictedPieces && renderPiecesTable()}
    </FormModal>
  );
};

PiecesPreviewModal.propTypes = propTypes;

export default PiecesPreviewModal;
