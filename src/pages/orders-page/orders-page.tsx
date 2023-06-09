import React, { useContext, useEffect, useState } from "react";
import MiniDrawer from "../../components/sidebar/sidebar";
import Box from "@mui/material/Box";
import styled from "styled-components";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { OrdersTable } from "./orders-table/orders-table";
import { getPaginationOrders } from "../../services/api.service";
import { IOrder } from "../../interfaces/orders.interfaces";
import { ReloadContext } from "../../context/reload.context";
import { AxiosError } from "axios";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>();
  const { reload } = useContext(ReloadContext);

  useEffect(() => {
    getPaginationOrders(page, pageSize)
      .then((data) => {
        setOrders(data.orders);
        setTotalPage(data.totalPages);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          window.localStorage.removeItem("token");
          window.location.reload();
          window.location.href = "/login";
        }
      });
  }, [page, pageSize, reload]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  return (
    <>
        <MiniDrawer>
          <FlexWrapper>
            <Typography variant="h4" component="h2">
              Заказы
            </Typography>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">
                size
              </InputLabel>
              <Select
                defaultValue="10"
                onChange={(e: SelectChangeEvent) => {
                  setPageSize(+e.target.value);
                }}
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                label="size *"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </FlexWrapper>
          <OrdersTable orders={orders} />
          <Pagination
            onChange={handlePageChange}
            sx={{ mt: 5, display: "flex", justifyContent: "center" }}
            count={totalPage}
            color="primary"
          />
        </MiniDrawer>
    </>
  );
};
