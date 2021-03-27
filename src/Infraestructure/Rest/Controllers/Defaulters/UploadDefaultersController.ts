// export type DefaultersExcelContent = {
//     nombre: string;
//     tipo_de_cuota: string;
//     email: string;
//     fecha_de_pago: string;
//   };
  
//   const router: Router = express.Router();
  
//   const commandBus = new ();
  
//   router.post(
//     '/upload',
//     requireAuth,
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         if (!req.files) {
//           new FileError('No file uploaded');
//         }
  
//         deleteOldExcels();
  
//         const file = req.files!.defaulters as fileUpload.UploadedFile;
  
//         await file.mv(`${FILES_PATH}/defaulters.xlsx`);
  
//         const service = new ExcelService();
  
//         const excel = service.read() as DefaultersExcelContent[];
  
//         await commandBus.execute(new EnsureUsersConsistencyCommand(excel));
  
//         for (const row of excel) {
//           await commandBus.execute(
//             new IngestDefaultersCommand(
//               row.nombre,
//               row.email,
//               row.tipo_de_cuota,
//               row.fecha_de_pago
//             )
//           );
//         }
  
//         res.status(200).send();
//       } catch (error) {
//         next(error);
//       }
//     }
//   );

  
// const deleteOldExcels = (): void => {
//     if (fs.existsSync(`${process.cwd()}/src/upload/defaulters.xlsx`)) {
//       fs.rmSync(`${process.cwd()}/src/upload/defaulters.xlsx`);
//     }
//   };