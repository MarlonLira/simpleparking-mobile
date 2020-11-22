import React from 'react';

import {
  Container,
  Card,
  CardHeader,
  HeaderCustom,
  CardBody,
  CardBodyCustom,
  Name,
  Description,
  CardEvaluation,
  TextEvaluation,
  DescriptionValue,
  ValueItem,
  TextValue,
  CardFooter,
  CardButton,
  TextButton,
} from './styles';

const ListScheduling = ({ data, handleHelp, handleActivate }) => {

  const renderDate = (date) => {
    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10)

    return `${day}/${month}/${year}`;
  }

  const getData = (value) => {
    switch(value){
      case 'PD':
        return 'Pendente';
      case 'AT': 
        return 'Ativo';
      case 'EX':
        return 'Excluído';
      default:
        return '';
    }
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <HeaderCustom>
            <Name>{data.userName}</Name>
            <Description>{data.vehicleType} - {data.vehiclePlate}</Description>
          </HeaderCustom>
        </CardHeader>
        <CardBody>
          <CardBodyCustom>

            <ValueItem>
              <TextValue>Status</TextValue>
              <DescriptionValue>{getData(data.status)}</DescriptionValue>
            </ValueItem>

            <ValueItem>
              <TextValue>Valor vaga</TextValue>
              <DescriptionValue>R$ {data.value.toFixed(2)}</DescriptionValue>
            </ValueItem>

            <ValueItem>
              <TextValue>Data</TextValue>
              <DescriptionValue>{renderDate(data.date)}</DescriptionValue>
            </ValueItem>

            <ValueItem>
              <TextValue>Horário</TextValue>
              <DescriptionValue>{data.avaliableTime.substring(0, 5)} - {data.unavailableTime.substring(0, 5)}</DescriptionValue>
            </ValueItem>

          </CardBodyCustom>
        </CardBody>

        <CardEvaluation>
          <TextEvaluation>Avaliação do Agendamento</TextEvaluation>
          <TextEvaluation>⭐⭐⭐⭐⭐</TextEvaluation>
        </CardEvaluation>

        <CardFooter>

          <CardButton activeOpacity={0.7} onPress={handleActivate}>
            <TextButton>Ativar vaga!</TextButton>
          </CardButton>

        </CardFooter>

      </Card>
    </Container>
  );
}

export default ListScheduling;