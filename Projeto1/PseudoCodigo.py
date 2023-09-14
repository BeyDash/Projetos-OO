// Definindo as estruturas de dados para as formas geométricas
estrutura Ponto:
    Real x
    Real y

estrutura Retângulo:
    Ponto pontoSuperiorEsquerdo
    Ponto pontoInferiorDireito

estrutura Círculo:
    Ponto centro
    Real raio

// Lista para armazenar as formas geométricas
Lista de FormasGeométricas

// Função para criar um ponto
função CriarPonto(x, y):
    ponto = Ponto()
    ponto.x = x
    ponto.y = y
    retornar ponto

// Função para criar um retângulo
função CriarRetângulo(pontoSuperiorEsquerdo, pontoInferiorDireito):
    retângulo = Retângulo()
    retângulo.pontoSuperiorEsquerdo = pontoSuperiorEsquerdo
    retângulo.pontoInferiorDireito = pontoInferiorDireito
    retornar retângulo

// Função para criar um círculo
função CriarCírculo(centro, raio):
    círculo = Círculo()
    círculo.centro = centro
    círculo.raio = raio
    retornar círculo

// Função para adicionar uma forma geométrica à lista
função AdicionarFormaGeometrica(forma):
    FormasGeométricas.adicionar(forma)

// Função para calcular a área de um retângulo
função CalcularÁreaRetângulo(retângulo):
    base = retângulo.pontoInferiorDireito.x - retângulo.pontoSuperiorEsquerdo.x
    altura = retângulo.pontoSuperiorEsquerdo.y - retângulo.pontoInferiorDireito.y
    área = base * altura
    retornar área

// Função para calcular a área de um círculo
função CalcularÁreaCírculo(círculo):
    área = 3.14159 * círculo.raio * círculo.raio
    retornar área

// Função principal do programa
função Principal():
    enquanto Verdadeiro:
        Escrever("Escolha uma opção:")
        Escrever("1. Adicionar um ponto")
        Escrever("2. Adicionar um retângulo")
        Escrever("3. Adicionar um círculo")
        Escrever("4. Calcular a área de uma forma geométrica")
        Escrever("5. Sair")
        
        opção = LerInteiro()
        
        se opção == 1:
            Escrever("Digite as coordenadas do ponto (x y):")
            x = LerReal()
            y = LerReal()
            ponto = CriarPonto(x, y)
            AdicionarFormaGeometrica(ponto)
        
        se opção == 2:
            // Solicitar pontos do retângulo e criar o retângulo
            // Adicionar o retângulo à lista de formas geométricas
        
        se opção == 3:
            // Solicitar centro e raio do círculo e criar o círculo
            // Adicionar o círculo à lista de formas geométricas
        
        se opção == 4:
            // Solicitar índice da forma geométrica na lista
            // Calcular e exibir a área da forma geométrica
        
        se opção == 5:
            Escrever("Programa encerrado.")
            sair
        
        senão:
            Escrever("Opção inválida. Tente novamente.")

