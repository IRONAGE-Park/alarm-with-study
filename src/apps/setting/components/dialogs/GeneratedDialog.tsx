import styled from "@emotion/styled";
import { Dialog, Button } from "@mui/material";
// React modules

interface GeneratedDialogProps {
  open: boolean;
  modelName: string;
  onClose: () => void;
  serialNumbers: string[];
}

const GeneratedDialog = ({
  open,
  modelName,
  onClose,
  serialNumbers,
}: GeneratedDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <StyleGeneratedContents>
      <StyleGeneratedHeader>
        <StyleExportExcelButton
          onClick={() =>
            window.excel_exporter.exportExcelFile(modelName, serialNumbers)
          }
        >
          엑셀로 내보내기
        </StyleExportExcelButton>
        <StyleModelName>{modelName} 생성 결과</StyleModelName>
      </StyleGeneratedHeader>
      <StyleSerialNumberTable>
        <thead>
          <tr>
            <th>순번</th>
            <th>시리얼 번호</th>
          </tr>
        </thead>
        <tbody>
          {serialNumbers.map((serialNumber, index) => (
            <tr key={serialNumber}>
              <td>{index + 1}</td>
              <td>{serialNumber}</td>
            </tr>
          ))}
        </tbody>
      </StyleSerialNumberTable>
    </StyleGeneratedContents>
  </Dialog>
);

export default GeneratedDialog;

const StyleGeneratedContents = styled.div`
  width: 100%;
  min-width: 600px;

  padding: 20px;
`;

const StyleGeneratedHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const StyleExportExcelButton = styled(Button)`
  width: 150px;
  height: 70px;

  color: ${({ theme }) => theme.color.system.check4};
  font-weight: bold;
  font-size: 17px;

  border: none;
  border-radius: 10px;

  background: ${({ theme }) => theme.color.system.check1};
`;

const StyleModelName = styled.h1``;

const StyleSerialNumberTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
  margin-top: 15px;

  th {
    font-size: 17px;
  }

  td {
    text-align: center;
    border: 1px solid black;
  }
`;
