<template>
  <div>
    <div class="container mx-auto p-4" v-if="usuario_rol == 'Cliente'">
      <div>
        <h2 class="text-xl font-bold mb-4">
          Reportes de Inversiones, Retiros y Devoluciones Pendientes
        </h2>

        <div class="d-flex justify-content-center">
          <button v-for="(tabCli, index) in tabsCli" :key="index" :class="[
            'animate__animated',
            'animate__fadeInUp',
            'animate__slow',
            'btn-6',
            'm-2',
            { active: activeTabCli === index },
          ]" @click="activeTabCli = index">
            {{ tabCli }} <span></span>
          </button>

          <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2" data-bs-toggle="modal"
            data-bs-target="#exportModalTal">
            Descargar <span></span>
          </button>
        </div>

        <!-- Modal para extraer para el Talento -->
        <div class="modal fade" id="exportModalTal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
          aria-labelledby="exportModalTalLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content bg-degrade">
              <div class="d-flex flex-row-reverse">
                <button type="button" @click="closeModal"
                  class="animate__animated animate__fadeInUp animate__slow btn-7 m-2" data-bs-dismiss="modal"
                  aria-label="Close">
                  Cerrar<span></span>
                </button>
              </div>

              <div class="modal-header m-auto text-dark">
                <h2 class="font-bold mb-4 title-modal" id="exportModalInvLabel">Descargar Reporte</h2>
                <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
              </div>

              <div class="modal-body px-5">
                <div class="d-flex justify-content-center text-dark gap-5 position-relative">
                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('hoy')"
                      :class="{ selected: selectedReport === 'hoy' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>Hoy</label>
                  </div>

                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('ayer')"
                      :class="{ selected: selectedReport === 'ayer' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>Ayer</label>
                  </div>

                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('semana')"
                      :class="{ selected: selectedReport === 'semana' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>Semana</label>
                  </div>

                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('mes')"
                      :class="{ selected: selectedReport === 'mes' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>Mes</label>
                  </div>

                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('anual')"
                      :class="{ selected: selectedReport === 'anual' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>Anual</label>
                  </div>

                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="showCustomDate"
                      :class="{ selected: band == true }" class="fa-regular fa-file fs-1" width="50" /><br />
                    <label>Personalizado</label>
                  </div>

                  <transition name="slide">
                    <div v-if="band == true" class="mx-1 card px-1">
                      <label for="fechaInicio">Fecha de Inicio</label><input @input="showReportCustom" id="fechaInicio"
                        v-model="fechaInicioCustom" class="form-control" type="date" />
                      <label for="fechaFin">Fecha Final</label><input @input="showReportCustom" id="fechaFin"
                        v-model="fechaFinCustom" class="form-control" type="date" /><br />
                    </div>
                  </transition>
                </div>

                <div class="card border-0">
                  <div class="card-body bg-degrade">
                    <h3 class="card-title text-center text-dark mt-5 mb-3 position-relative">
                      <div class="custom-abs-rigth">
                        <button @click="exportToPDF()">
                          <img src="../assets/svg/diskette-svgrepo-com.svg" width="35" alt="" />
                        </button>
                      </div>

                      <span class="subtitle-class">Reportes</span>

                      <div class="d-flex float-left px-5 mb-3 custom-abs-left">
                        <div class="btn-group dropup">
                          <button type="button" class="btn btn-blue dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <label class="text-white">{{ typeReport }}</label>
                          </button>

                          <ul class="dropdown-menu">
                            <li @click="showTable('Inversiones')">
                              <a class="dropdown-item" href="#">Inversiones</a>
                            </li>
                            <li @click="showTable('Retiros')">
                              <a class="dropdown-item" href="#">Retiros</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </h3>
                  </div>
                </div>

                <div class="px-5 d-flex justify-content-center">
                  <div class="col">
                    <table v-if="typeReport == 'Inversiones' && reports.length > 0" class="table table-sm align-middle">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Inversionista</th>
                          <th scope="col">Tokens Invertidos</th>
                          <th scope="col">Tokens a Devolver</th>
                          <th scope="col">Fecha de Inversion</th>
                          <th scope="col">Fecha de Retorno(Aprox)</th>
                        </tr>
                      </thead>
                      <tbody v-if="reports.length > 0">
                        <tr v-for="rep in reports" :key="rep">
                          <td scope="col">{{ rep.inversion_id }}</td>
                          <td scope="col">{{ rep.inversor }}</td>
                          <td scope="col">{{ rep.monto }}</td>
                          <td scope="col">{{ monto_devolver(rep.monto, rep.ganancia) }}</td>
                          <td scope="col">{{ new Date(rep.fecha_deposito).toLocaleDateString() }}</td>
                          <td scope="col">{{ new Date(rep.fecha_devolucion).toLocaleDateString() }}</td>
                        </tr>
                      </tbody>
                    </table>

                    <table v-if="typeReport == 'Retiros' && reports.length > 0" class="table table-sm align-middle">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Monto Solicitado</th>
                          <th scope="col">Monto a Recibir</th>
                          <th scope="col">Fecha Solicitud</th>
                          <th scope="col">Fecha de Aprobacion</th>
                          <th scope="col">Estado</th>
                        </tr>
                      </thead>
                      <tbody v-for="rep in reports" :key="rep">
                        <tr>
                          <td scope="col">{{ rep.retiro_id }}</td>
                          <td scope="col">{{ rep.monto_solicitud }}</td>
                          <td scope="col">{{ rep.monto_recibir }}</td>
                          <td scope="col">{{ new Date(rep.fecha_solicitud).toLocaleDateString() }}</td>
                          <td scope="col">{{ new Date(rep.fecha_aprobacion).toLocaleDateString() }}</td>
                          <td scope="col">{{ rep.estado }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col text-dark">
                    <div class="card m-1" v-if="reports.length > 0">
                      <div class="card-body">
                        <h5 class="card-title">Compras e Inversiones de Tokens</h5>
                        <apexchart v-if="reports.length > 0" width="100%" type="area" :options="options"
                          :series="series"></apexchart>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-dark my-3" v-if="reports.length == 0 && bandAlert">
                  <div class="d-flex justify-content-center rounded-3">
                    <div class="alert alert-warning" role="alert">
                      <h4 class="alert-heading">¡Sin resultados!</h4>
                      <p>
                        No se encontraron resultados entre las fechas seleccionadas.<br>
                        Por favor, intenta con un rango de fechas diferente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Final modal para extraer para el Talento -->

        <!-- Lista Inversiones -->
        <div class="tab-content" v-if="activeTabCli === 0">
          <div class="p-3 shadow-md text-center" v-for="inversion_recibida in inversiones_recibidas"
            :key="inversion_recibida">
            <div class="custom-card row bg-degrade-inverso p-3">
              <div class="col-9 text-white text-center border-end p-3">
                <p class="text-white text-center">
                  Inversión ID: {{ inversion_recibida.inversion_id }}
                </p>
                <p class="text-white text-center">
                  Inversionista: {{ inversion_recibida.nombre_inversor }}
                </p>
                <p class="text-white text-center">
                  Tokens Recibidos: {{ inversion_recibida.monto }}
                </p>
                <p class="text-white text-center">
                  Fecha: {{ formatDate(inversion_recibida.fecha_deposito) }}
                </p>
              </div>

              <div class="col-3 p-3">
                <img :src="inversion_recibida.imagen" width="150" class="rounded-circle" alt="" />
              </div>
            </div>
          </div>
          <div class="text-dark my-3" v-if="inversiones_recibidas.length == 0 && bandAlert">
            <div class="d-flex justify-content-center rounded-3">
              <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">¡Sin resultados!</h4>
                <p>
                  No se encontraron resultados de inversiones recibidas.<br>
                  Se mostrará en blanco hasta que reciba alguna inversión.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de solicitudes de retiro -->
        <div class="tab-content" v-if="activeTabCli === 1">
          <div class="p-3 shadow-md text-center" v-for="cliente_retiro in clientes_retiros" :key="cliente_retiro">
            <div class="custom-card bg-degrade-inverso p-3">
              <h3 class="text-white text-center">
                Monto:<br />
                ${{ cliente_retiro.monto_recibir }}
              </h3>
              <p class="text-white text-center">
                Solicitud: {{ cliente_retiro.retiro_id }}
              </p>
              <p class="text-white text-center">
                Fecha Solicitud: {{ formatDate(cliente_retiro.fecha_solicitud) }}
              </p>
              <p class="text-white text-center">Estado: {{ cliente_retiro.estado }}</p>
              <p class="text-white text-center" v-if="cliente_retiro.estado == 'Aprobado'">
                Fecha Aprobación: {{ formatDate(cliente_retiro.fecha_aprobacion) }}
              </p>
            </div>
          </div>
          <div class="text-dark my-3" v-if="clientes_retiros.length == 0 && bandAlert">
            <div class="d-flex justify-content-center rounded-3">
              <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">¡Sin resultados!</h4>
                <p>
                  No se encontraron resultados de solicitudes de retiros.<br>
                  Se mostrará en blanco hasta que realice alguna solicitud.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de Devoluciones Pendientes-->
        <div class="tab-content" v-if="activeTabCli === 2">
          <div class="p-3 shadow-md text-center" v-for="inversion_vencida in inversiones_vencidas"
            :key="inversion_vencida">
            <div class="custom-card bg-degrade-inverso p-3 d-flex flex-column align-items-center">
              <p class="text-white text-center">
                Solicitud: {{ inversion_vencida.inversion_id }}
              </p>
              <p class="text-white text-center">
                Tokens Pendientes: {{ inversion_vencida.ganancia_estimada }}
              </p>
              <p class="text-white text-center">
                Fecha de Inversion: {{ formatDate(inversion_vencida.fecha_deposito) }}
              </p>
              <p class="text-white text-center">
                Fecha de Vencimiento: {{ formatDate(inversion_vencida.fecha_devolucion) }}
              </p>
              <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2"
                @click="devolverTokens(inversion_vencida)">
                Devolver Inversión<span></span>
              </button>
            </div>
          </div>
          <div class="text-dark my-3" v-if="inversiones_vencidas.length == 0 && bandAlert">
            <div class="d-flex justify-content-center rounded-3">
              <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">¡Sin resultados!</h4>
                <p>
                  No se encontraron resultados de inversiones vencidas para pagar.<br>
                  Se mostrará en blanco hasta que tenga una inversión vencida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto p-4" v-if="usuario_rol == 'Inversionista'">
      <div class="bg-zinc-100 p-4 rounded-lg mb-6">
        <h2 class="text-xl font-bold mb-4">Reportes de Inversiones y Retiros</h2>
        <!-- Contenedor de tabs -->
        <div class="d-flex justify-content-center">
          <!-- Clase añadida para centrar -->
          <button v-for="(tabInv, index) in tabsInv" :key="index" :class="[
            'animate__animated',
            'animate__fadeInUp',
            'animate__slow',
            'btn-6',
            'm-2',
            { active: activeTabInv === index },
          ]" @click="activeTabInv = index">
            {{ tabInv }} <span></span>
          </button>

          <button data-bs-toggle="modal" data-bs-target="#exportModalInv"
            class="animate__animated animate__fadeInUp animate__slow btn-6 m-2">
            Descargar <span></span>
          </button>
        </div>

        <!-- Modal para extraer para el Inversor -->
        <div class="modal fade" id="exportModalInv" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
          aria-labelledby="exportModalInvLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
            <div class="modal-content position-relative bg-degrade">
              <div class="d-flex flex-row-reverse">
                <button type="button" @click="closeModal"
                  class="animate__animated animate__fadeInUp animate__slow btn-7 m-2" data-bs-dismiss="modal"
                  aria-label="Close">
                  Cerrar<span></span>
                </button>
              </div>

              <div class="modal-header m-auto">
                <h2 class="font-bold mb-4 title-modal" id="exportModalInvLabel">Descargar Reporte</h2>
                <br />
                <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
              </div>

              <div class="modal-body px-5">
                <div class="d-flex justify-content-center text-dark gap-5 position-relative">
                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('general')"
                      :class="{ selected: selectedReport === 'general' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>General</label>
                  </div>
                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('hoy')"
                      :class="{ selected: selectedReport === 'hoy' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>Hoy</label>
                  </div>
                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('ayer')"
                      :class="{ selected: selectedReport === 'ayer' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>Ayer</label>
                  </div>
                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('semana')"
                      :class="{ selected: selectedReport === 'semana' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>Semana</label>
                  </div>
                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('mes')"
                      :class="{ selected: selectedReport === 'mes' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>Mes</label>
                  </div>
                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="getReports('anual')"
                      :class="{ selected: selectedReport === 'anual' }" class="fa-regular fa-file fs-1"
                      width="50" /><br /><label>Anual</label>
                  </div>
                  <div class="mx-1 m-auto border-custom cursor custom-hover">
                    <img src="../assets//svg/report-svgrepo-com.svg" @click="showCustomDate"
                      :class="{ selected: band == true }" class="fa-regular fa-file fs-1" width="50" /><br />
                    <label>Personalizado</label>
                  </div><br>
                  <transition name="slide">
                    <div v-if="band == true" class="mx-1 card px-1">
                      <label for="fechaInicio">Fecha de Inicio</label><input @input="showReportCustom" id="fechaInicio"
                        v-model="fechaInicioCustom" class="form-control" type="date" />
                      <label for="fechaFin">Fecha Final</label><input @input="showReportCustom" id="fechaFin"
                        v-model="fechaFinCustom" class="form-control" type="date" /><br />
                    </div>
                  </transition>
                </div>
                <div class="card border-0">
                  <div class="card-body bg-degrade">
                    <h3 class="card-title text-center text-dark mt-5 mb-3 position-relative">
                      <div class="custom-abs-rigth">
                        <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2"
                          @click="exportToPDF()">
                          <img src="../assets/svg/diskette-svgrepo-com.svg" width="35" alt="" />
                        </button>
                      </div>
                      <span class="subtitle-class">Reportes</span>
                      <div class="d-flex float-left px-5 mb-3 custom-abs-left">
                        <div class="btn-group dropup">
                          <button type="button" class="btn btn-blue dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <label class="text-white">{{ typeReport }} <span></span></label>
                          </button>
                          <ul class="dropdown-menu">
                            <li @click="showTable('Inversiones')">
                              <a class="dropdown-item" href="#">Inversiones</a>
                            </li>
                            <li @click="showTable('Retiros')">
                              <a class="dropdown-item" href="#">Retiros</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </h3>
                  </div>
                </div>

                <div class="row px-5 d-flex justify-content-center">
                  <div class="col-7 table-responsive">
                    <table v-if="typeReport == 'Inversiones' && reports.length > 0" class="table table-sm align-middle">
                      <thead class="align-middle">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Talento</th>
                          <th scope="col">Tokens Invertidos</th>
                          <th scope="col">Ganancia de Tokens</th>
                          <th scope="col">Fecha de Inversión</th>
                          <th scope="col">Fecha de Retorno(Aprox)</th>
                        </tr>
                      </thead>
                      <tbody v-if="reports.length > 0">
                        <tr v-for="rep in reports" :key="rep">
                          <td scope="col">{{ rep.inversion_id }}</td>
                          <td scope="col">{{ rep.cliente }}</td>
                          <td scope="col">{{ rep.monto }}</td>
                          <td scope="col">{{ rep.ganancia }}</td>
                          <td scope="col">
                            {{ new Date(rep.fecha_deposito).toLocaleDateString() }}
                          </td>
                          <td scope="col">
                            {{ new Date(rep.fecha_devolucion).toLocaleDateString() }}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table v-if="typeReport == 'Retiros' && reports.length > 0" class="table table-sm align-middle">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Monto Solicitado</th>
                          <th scope="col">Monto a Recibir</th>
                          <th scope="col">Fecha Solicitud</th>
                          <th scope="col">Fecha de Aprobación</th>
                          <th scope="col">Estado</th>
                        </tr>
                      </thead>
                      <tbody v-for="rep in reports" :key="rep">
                        <tr>
                          <td scope="col">{{ rep.retiro_id }}</td>
                          <td scope="col">{{ rep.monto_solicitud }}</td>
                          <td scope="col">{{ rep.monto_recibir }}</td>
                          <td scope="col">{{ new Date(rep.fecha_solicitud).toLocaleDateString() }}</td>
                          <td scope="col">{{ new Date(rep.fecha_aprobacion).toLocaleDateString() }}</td>
                          <td scope="col">{{ rep.estado }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-5" v-if="reports.length > 0">
                    <div class="card m-1">
                      <div class="card-body">
                        <h5 class="card-title">Compras e Inversiones Anuales de Tokens</h5>
                        <apexchart v-if="reports.length > 0" width="100%" type="area" :options="options"
                          :series="series"></apexchart>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-dark my-3" v-if="reports.length == 0 && bandAlert">
                  <div class="d-flex justify-content-center rounded-3">
                    <div class="alert alert-warning" role="alert">
                      <h4 class="alert-heading">¡Sin resultados!</h4>
                      <p>
                        No se encontraron resultados entre las fechas seleccionadas.<br> Por
                        favor, intenta con un rango de fechas diferente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Final modal para extraer para el Inversor -->

        <!-- Contenido de los tabs -->
        <!-- Lista de Inversiones Recibidas-->
        <div class="tab-content" v-if="activeTabInv === 0">
          <div class="p-3 shadow-md text-center" v-for="inversion in inversiones" :key="inversion">
            <div class="custom-card row bg-degrade-inverso p-3">
              <div class="col-9 text-white text-center border-end p-3">
                <p class="text-white text-center">
                  Inversión ID: {{ inversion.inversion_id }}
                </p>
                <p class="text-white text-center">
                  Cliente: {{ inversion.nombre_cliente }}
                </p>
                <p class="text-white text-center">
                  Tokens Invertidos: {{ inversion.monto }}
                </p>
                <p class="text-white text-center">
                  Ganancia de Tokens: {{ inversion.ganancia_estimada - inversion.monto }}
                </p>
                <p class="text-white text-center">
                  Fecha de Inversión: {{ formatDate(inversion.fecha_deposito) }}
                </p>
                <p class="text-white text-center">
                  Fecha de Retorno Aprox.: {{ formatDate(inversion.fecha_devolucion) }}
                </p>
              </div>

              <div class="col-3 p-3">
                <img :src="inversion.imagen" width="200" class="rounded-circle" alt="" />
              </div>
            </div>
          </div>
          <div class="text-dark my-3" v-if="inversiones.length == 0 && bandAlert">
            <div class="d-flex justify-content-center rounded-3">
              <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">¡Sin resultados!</h4>
                <p>
                  No se encontraron resultados de inversiones realizadas.<br>
                  Se mostrará en blanco hasta que realice una inversión.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de solicitudes de retiro-->
        <div class="tab-content" v-if="activeTabInv === 1">
          <div class="card bg-degrade-inverso p-4 rounded-lg shadow-md"
            v-for="inversionista_retiro in inversionistas_retiros" :key="inversionista_retiro">
            <p class="text-white">Monto: ${{ inversionista_retiro.monto_recibir }}</p>
            <p class="text-white">Solicitud: {{ inversionista_retiro.retiro_id }}</p>
            <p class="text-white">Fecha: {{ inversionista_retiro.fecha_solicitud }}</p>
            <p class="text-white">Estado: {{ inversionista_retiro.estado }}</p>
            <p class="text-white" v-if="inversionista_retiro.estado == 'Aprobado'">
              Fecha Aprobación: {{ formatDate(inversionista_retiro.fecha_aprobacion) }}
            </p>
          </div>
          <div class="text-dark my-3" v-if="inversionistas_retiros.length == 0 && bandAlert">
            <div class="d-flex justify-content-center rounded-3">
              <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">¡Sin resultados!</h4>
                <p>
                  No se encontraron resultados de solicitudes de retiros.<br>
                  Se mostrará en blanco hasta que realice una solicitud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import {
  getCurrentYearStartAndEnd,
  getDayStartAndEnd,
  getMonthStartAndEnd,
  getWeekStartAndEnd,
  getYesterdayStartAndEnd,
} from "@/helpers/utilities";
import apexchart from "vue3-apexcharts";
import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// const route = useRouter();
const tabsInv = ref(["Inversiones", "Retiros"]);
var activeTabInv = ref(0);

const tabsCli = ref(["Inversiones", "Retiros", "Devoluciones"]);
var activeTabCli = ref(0);
var typeReport = ref("Inversiones");
const bandAlert = ref(false);

// let baseURL = "https://apitalentos.pruebasdeploy.online/inversionesRetiros/";
let baseURL = import.meta.env.VITE_BASE_URL + "/inversionesRetiros/";
const selectedReport = ref("");
const cliente_ID = ref("");
const inversionista_ID = ref("");
const usuario = JSON.parse(localStorage.getItem("usuario"));
const usuario_id = ref(usuario.usuario_id);
const usuario_rol = ref(usuario.rol);
const client = ref("");
if (usuario_rol.value == "Inversionista") {
  inversionista_ID.value = usuario_id.value;
  onMounted(() => {
    obtenerInversiones_Inversionista();
    obtenerInversionista_retiro();
    typeClient.value = "reporteInversionesInversor";
    client.value = "inversor_id";
    getReports("mes");
    obtenerTotales();
  });
}
if (usuario_rol.value == "Cliente") {
  cliente_ID.value = usuario_id.value;
  onMounted(() => {
    obtenerInversiones_Clientes();
    obtenerCliente_retiro();
    obtenerInversiones_Clientes_Vencidas();
    obtenerTokens_Cliente();
    typeClient.value = "reporteInversionesCliente";
    client.value = "cliente_id";
    getReports("mes");
    obtenerTotales();
  });
}

const inversiones = ref([]);
const inversionistas_retiros = ref([]);
const inversiones_recibidas = ref([]);
const clientes_retiros = ref([]);
const inversiones_vencidas = ref([]);

const tokensRecibidosCliente = ref(0);
const tokensDeudasCliente = ref(0);

const obtenerInversiones_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + "inversionista/" + inversionista_ID.value);
    inversiones.value = data.data;
    console.log(inversiones.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerInversionista_retiro = async () => {
  try {
    const { data } = await axios.get(
      baseURL + "inversionista_retiros/" + inversionista_ID.value
    );
    inversionistas_retiros.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerInversiones_Clientes = async () => {
  try {
    const { data } = await axios.get(baseURL + "cliente/" + cliente_ID.value);
    inversiones_recibidas.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerCliente_retiro = async () => {
  try {
    const { data } = await axios.get(baseURL + "cliente_retiros/" + cliente_ID.value);
    clientes_retiros.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerInversiones_Clientes_Vencidas = async () => {
  try {
    const { data } = await axios.get(
      baseURL + "inversiones_vencidas/" + cliente_ID.value
    );
    inversiones_vencidas.value = data.data;
    console.log(inversiones_vencidas.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTokens_Cliente = async () => {
  try {
    const { data } = await axios.get(
      baseURL + "tokensClienteRecibido/" + cliente_ID.value
    );
    tokensRecibidosCliente.value =
      data.data[0].totalTokensRecibidos + data.data[0].tokensCompradosCliente;
    tokensDeudasCliente.value = data.data[0].totalTokensDeudas;
    console.log(tokensRecibidosCliente.value);
  } catch (error) {
    console.log(error);
  }
};

const devolverTokens = async (inversion) => {
  console.log(inversion);
  console.log(inversion.monto);
  console.log(tokensRecibidosCliente.value);

  if (inversion.monto < tokensRecibidosCliente.value) {
    const datos = {
      inversion_id: inversion.inversion_id,
      token: inversion.monto,
      usuario_id: inversion.inversor_id,
      cliente_id: cliente_ID.value,
      inversor_id: inversion.inversor_id,
      tipo: "Egreso",
      descripcion: "Devolucion de tokens",
    };
    console.log(datos);
    try {
      await axios.post(baseURL + "devolverTokens", datos);
      Swal.fire({
        title: "¡Felicidades!",
        text: "Devolución de tokens realizada con éxito",
        icon: "success",
        allowOutsideClick: true,
        allowEscapeKey: true,
        color: "var(--gray-color)",
        confirmButtonColor: "var(--yellow-orange)",
      });
      var myModalEl = document.getElementById("modalInversion");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
    } catch (error) {
      console.error("Error al invertir los tokens:", error);
    }
  } else {
    Swal.fire({
      title: "¡Error!",
      text: "La cantidad de tokens es insuficiente",
      icon: "error",
      allowOutsideClick: true,
      allowEscapeKey: true,
      color: "var(--gray-color)",
      confirmButtonColor: "var(--yellow-orange)",
    });
  }
  obtenerInversiones_Clientes_Vencidas();
};

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

// funciones de obtener reportes
// const baseUrl = "https://apitalentos.pruebasdeploy.online/reportes/";
// const baseUrl = "https://apitalentos.pruebasdeploy.online/reportes/";
const baseUrl = import.meta.env.VITE_BASE_URL + "/reportes/";
// const reportUrl = "https://apitalentos.pruebasdeploy.online/report/";
const reportUrl = import.meta.env.VITE_BASE_URL + "/report/";
const band = ref(false);
var fechaInicio = ref("");
const typeClient = ref("");
var fechaFin = ref("");
var fechaInicioCustom = ref("");
var fechaFinCustom = ref("");
const reports = ref([]);
const getReports = (report) => {
  selectedReport.value = report;
  band.value = false;
  fechaInicioCustom.value = "";
  fechaFinCustom.value = "";
  switch (report) {
    case "hoy":
      const { startOfDay, endOfDay } = getDayStartAndEnd();
      fechaInicio.value = startOfDay;
      fechaFin.value = startOfDay;
      break;
    case "ayer":
      const { startOfYesterday, endOfYesterday } = getYesterdayStartAndEnd();
      fechaInicio.value = startOfYesterday;
      fechaFin.value = startOfYesterday;
      console.log(fechaInicio.value, fechaFin.value);
      break;
    case "semana":
      const { startOfWeek, endOfWeek } = getWeekStartAndEnd();
      fechaInicio.value = startOfWeek;
      fechaFin.value = endOfWeek;
      break;
    case "mes":
      const { startOfMonth, endOfMonth } = getMonthStartAndEnd();
      fechaInicio.value = startOfMonth;
      fechaFin.value = endOfMonth;
      break;
    case "general":
      fechaInicio.value = '2024-01-01'; //provisional
      fechaFin.value = '2025-01-01';//provisional
      break;
    case "anual":
      const { startOfYear, endOfYear } = getCurrentYearStartAndEnd();
      fechaInicio.value = startOfYear;
      fechaFin.value = endOfYear;
      break;
    default:
      break;
  }
  if (typeReport.value == "Inversiones") {
    getData(
      `${typeClient.value}/?fecha_inicio=${fechaInicio.value}&fecha_final=${fechaFin.value}&${client.value}=${usuario.usuario_id}`
    );
    // console.log(`${typeClient.value}/?fecha_inicio=${fechaInicio.value}&fecha_final=${fechaFin.value}&${client.value}=${usuario.usuario_id}`);
  }
  if (typeReport.value == "Retiros") {
    getData(
      `reporteSolicitudesID/?fecha_inicio=${fechaInicio.value}&fecha_final=${fechaFin.value}&usuario_id=${usuario.usuario_id}`
    );
    // console.log(`reporteSolicitudesID/?fecha_inicio=${fechaInicio.value}&fecha_final=${fechaFin.value}&${client.value}=${usuario.usuario_id}`);
  }
  // http://localhost:3000/reportes/reporteSolicitudesID/?fecha_inicio=2024-11-01&fecha_final=2024-11-30&usuario_id=88
  // reporteSolicitudesID/?fecha_inicio=2024-01-01&fecha_final=2024-12-31&inversor_id=88
  bandAlert.value = true;
};

watch(typeReport, () => {
  cleanFields();
});

const showReportCustom = () => {
  const fechaInicio = fechaInicioCustom.value?.trim();
  const fechaFin = fechaFinCustom.value?.trim();
  if (
    fechaInicio && fechaFin &&
    !isNaN(Date.parse(fechaInicio)) &&
    !isNaN(Date.parse(fechaFin))
  ) {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    if (fechaFinDate > fechaInicioDate) {
      getData(
        `${typeClient.value}/?fecha_inicio=${fechaInicio}&fecha_final=${fechaFin}&inversor_id=${usuario.usuario_id}`
      );
    }
  }
};

const getData = async (url) => {
  console.log(baseUrl + url);
  try {
    const { data } = await axios.get(baseUrl + url);
    (reports.value = data.data), console.log(reports.value);
  } catch (error) { }
};

const showCustomDate = () => {
  band.value = true;
  cleanFields();
};

const showTable = () => {
  typeReport.value = typeReport.value === "Inversiones" ? "Retiros" : "Inversiones";
  console.log(typeReport.value);
};

const closeModal = () => {
  console.log("cerrado");
  cleanFields();
};

const cleanFields = () => {
  fechaInicio.value = "";
  fechaFin.value = "";
  fechaFinCustom.value = "";
  fechaInicioCustom.value = "";
  reports.value = [];
  bandAlert.value = false;
  selectedReport.value = "";
};
const monto_devolver = (a, b) => {
  return a + b;
};
const series = ref([]);
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const options = ref({
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: meses,
  },
});

const obtenerTotales = async () => {
  series.value = [];
  try {
    const { data } = await axios.get(reportUrl + "totalCompras/" + usuario_id.value);
    console.log(data);
    var datosMesCompra = [];
    for (let i = 0; i < meses.length; i++) {
      let mes = i + 1;

      datosMesCompra[i] = 0;

      for (let j = 0; j < data.data.length; j++) {
        if (mes == data.data[j].mes) {
          datosMesCompra[i] = data.data[j].tokens_comprados;
        }
      }
    }

    var datos = {
      name: "Compra de Tokens",
      data: datosMesCompra,
    };
    series.value.push(datos);
  } catch (error) {
    console.log(error);
  }
  try {
    const { data } = await axios.get(reportUrl + "totalInversiones/" + usuario_id.value);

    var datosMesVenta = [];
    for (let i = 0; i < meses.length; i++) {
      let mes = i + 1;

      datosMesVenta[i] = 0;

      for (let j = 0; j < data.data.length; j++) {
        if (mes == data.data[j].mes) {
          datosMesVenta[i] = data.data[j].tokens_invertidos;
        }
      }
    }

    var datos = {
      name: "Inversiones de Tokens",
      data: datosMesVenta,
    };
    series.value.push(datos);
  } catch (error) {
    console.log(error);
  }
};

const exportToPDF = () => {
  const doc = new jsPDF();

  const columns = [
    { header: "ID", dataKey: "inversion_id" },
    { header: "Inversionista", dataKey: "inversor" },
    { header: "Token Invertidos", dataKey: "monto" },
    { header: "Tokens a Devolver", dataKey: "ganancia" },
    { header: "Fecha de Inversion", dataKey: "fecha_deposito" },
    { header: "Fecha de Retorno(Aproximado)", dataKey: "fecha_devolucion" },
  ];

  const rows = reports.value.map((report) => ({
    inversion_id: report.inversion_id,
    inversor: report.inversor,
    monto: report.monto,
    ganancia: report.ganancia,
    fecha_deposito: report.fecha_deposito,
    fecha_devolucion: report.fecha_devolucion,
  }));

  console.log("Rows para PDF Cliente", rows);

  doc.autoTable({
    columns: columns,
    body: rows,
    startY: 20,
    theme: "grid",
    styles: {
      overflow: "linebreak",
      cellPadding: 2,
      fontSize: 9,
    },
  });
  doc.text("Reporte de Inversiones y Retiros", doc.internal.pageSize.width / 2, 10, {
    align: "center",
  });
  doc.save("Reporte de Inversiones y Retiros.pdf");
};
</script>

<style scoped>
.dropdown-item:hover {
  background-color: var(--yellow-orange);
  color: white;
}

.selected {
  text-decoration: underline;
  border-radius: 50%;
  border: 3px solid #162139;
  padding: 10px;
  font-weight: bold;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.selected {
  text-decoration: underline;
  font-weight: bold;
}

.abs-custom-icon-close {
  position: absolute;
  right: 0%;
}

.custom-abs-left {
  position: absolute;
  top: 0;
  left: 20px;
}

.custom-abs-rigth {
  position: absolute;
  top: 0;
  right: 100px;
}

.bg-degrade {
  background: linear-gradient(to right, var(--gray-color), rgb(101, 126, 197));
}

.bg-degrade-inverso {
  background: linear-gradient(to left, var(--gray-color), rgb(101, 126, 197));
}

.active {
  background-color: var(--gray-color);
  color: white !important;
  border-radius: 10px !important;
  padding-bottom: 2px !important;
  z-index: 1 !important;
}

.custom-card {
  border-radius: 15px;
}

label {
  color: var(--white-color);
  font-size: 1rem;
}

.subtitle-class {
  color: var(--white-color);
}

.title-modal {
  font-family: var(--font-montserrat-bold);
  font-weight: 700;
  font-size: 30px;
  color: var(--white-color);
  text-transform: uppercase;
}

button {
  color: rgb(128, 159, 245);
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 25px;
  transition: background-color 0.3s, transform 0.3s;
}

.animate__slow {
  animation-duration: 5s;
}

.btn-6 {
  position: relative;
  display: block;
  overflow: hidden;
  text-transform: uppercase;
  border: 1px solid currentColor;
  color: var(--gray-color);
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
}

.btn-6 span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: var(--gray-color);
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.btn-7 {
  background-color: var(--white-color) !important;
  width: 10% !important;
  display: block;
  overflow: hidden;
  text-transform: uppercase;
  border: 1px solid currentColor;
  color: var(--gray-color);
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
}

.btn-7:hover {
  background-color: rgb(173, 1, 1) !important;
  color: var(--white-color) !important;
  font-display: bold;
}

.btn-6:hover {
  color: var(--white-anti-flash-color);
}

.btn-6:hover span {
  width: 225%;
  height: 562.5px;
}

.active::after {
  transform: scaleX(1) !important;
  transform-origin: left !important;
}

p {
  font-size: 1rem;
  color: var(--gray-color);
  margin-right: 15px;
}

tr {
  color: var(--gray-color);
}

.table {
  border-radius: 10px;
  overflow: hidden;
}

.alert-warning {
  border-color: var(--gray-color) !important;
  background-color: var(--white-color);
  color: var(--gray-color);
}

.alert-heading {
  color: var(--yellow-orange);
}
</style>