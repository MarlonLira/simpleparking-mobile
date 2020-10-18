import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

export const Card = styled.View`
  min-height: 200px;
  padding: 15px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  min-height: 50px;
  align-items: center;
  padding-bottom: 10px;
`;

export const HeaderCustom = styled.View`
  flex-direction: column;
`;

export const CardBody = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  min-height: 50px;
`

export const CardBodyCustom = styled.View`
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const ValueItem = styled.View`
  flex-direction: row;  
  justify-content: space-between;
`;

export const CardEvaluation = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  min-height: 50px;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.Text`
  font-size: 15px;
  color: #000;
`
export const Description = styled.Text`
  font-size: 14px;
  color: #5C5C5C;
`;

export const DescriptionValue = styled.Text`
  font-size: 14px;
  color: #5C5C5C;
  margin-bottom: 5px;
`;

export const TextValue = styled.Text`
  color: #000;
  font-size: 13px;
`

export const TextEvaluation = styled.Text`
  color: #000;
  font-size: 13px;
`;

export const CardFooter = styled.View`
  display: flex;
  flex-direction: row;
  min-height: 50px;
`;

export const CardButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 50%;
`
export const TextButton = styled.Text`
  font-size: 14px;
  color: #59578e ;
`