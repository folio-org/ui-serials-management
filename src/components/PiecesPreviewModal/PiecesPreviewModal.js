import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy } from '@folio/stripes/core';
import { FormModal } from '@k-int/stripes-kint-components';
import { Button, Datepicker, Row, Col } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';

import { GENERATE_PIECES_PREVIEW } from '../../constants/endpoints';
import { useState } from 'react';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleChange: PropTypes.func,
  ruleset: PropTypes.object,
};

const PiecesPreviewModal = ({
  showModal,
  setShowModal,
  handleChange,
  ruleset,
}) => {
  const ky = useOkapiKy();
  const [predictedPieces, setPredictedPieces] = useState(null);

  const handleClose = () => {
    setShowModal(false);
  };

  const submitValues = {
    ...ruleset,
    startDate: '2022-04-01',
  };
  submitValues?.recurrence?.rules?.forEach((e) => {
    // If no ordinal specified, assume ordinal is 1 for all rules
    if (!e?.ordinal) {
      e.ordinal = 1;
    }
    // If no pattern fields are supplied (in the case of the day time unit)
    // Add anempty pattern object to all rules
    if (!e?.pattern) {
      e.pattern = {};
    }
    e.patternType = submitValues?.patternType;
  });

  const { mutateAsync: generatePieces } = useMutation(
    ['ui-serials-management', 'PiecesPreviewModal', 'generatePreview'],
    (data) =>
      ky
        .post(GENERATE_PIECES_PREVIEW, { json: submitValues })
        .json()
        .then((res) => setPredictedPieces(res))
  );

  const submit = async (values, form) => {
    // await postParty(values);
  };

  return (
    <FormModal
      modalProps={{
        onClose: handleClose,
        open: showModal,
        label: <FormattedMessage id="ui-oa.party.newPerson" />,
      }}
      mutators={arrayMutators}
      onSubmit={submit}
    >
      <Row>
        <Col xs={4}>
          <Field
            component={Datepicker}
            name="startDate"
            required
            usePortal
            validate={requiredValidator}
          />
        </Col>
        <Col xs={4}>
          <Button buttonStyle="primary" onClick={() => generatePieces()}>
            Generate Pieces
          </Button>
        </Col>
      </Row>
      {!!predictedPieces && JSON.stringify(predictedPieces, null, 2)}
    </FormModal>
  );
};

PiecesPreviewModal.propTypes = propTypes;

export default PiecesPreviewModal;
