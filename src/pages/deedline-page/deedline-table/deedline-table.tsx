import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  IDeedline,
  IDeedlineProps,
} from "../../../interfaces/deedline.interface";
import { Button } from "@mui/material";
import { ChangeDeedModal } from "../change-modal/change-modal";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const DeedlineTable: React.FC<IDeedlineProps> = (props) => {
  const deedlines: IDeedline[] = props.deedlines as any;
  const [open, setOpen] = useState<boolean>(false);
  const [oldTime, setOldTime] = useState<number>();
  const [id, setId] = useState<string>("");

  return (
    <>
      <ChangeDeedModal
        deedId={id}
        time={oldTime}
        open={open}
        setOpen={setOpen}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ИД</StyledTableCell>
              <StyledTableCell>Время</StyledTableCell>
              <StyledTableCell>Изменить</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deedlines?.map((deed, index) => (
              <StyledTableRow key={deed._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{deed.time + " minut"}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => {
                      setOldTime(deed.time);
                      setId(deed._id);
                      setOpen(!open);
                    }}
                    variant="outlined"
                  >
                    Изменить
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
