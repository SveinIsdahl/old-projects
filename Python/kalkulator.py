while True:
    print("Muligheter")
    print("Skriv pluss for å addere to tall")
    print("Skriv in minus for å subtrahere to tall")
    print("Skriv in gange for å multiplisere to tall")
    print("SKriv inn dele for å dividere to tall")
    print("Skriv quit for å avslutte")
    user_input = input(": ")
    if user_input == "quit":
        break
    elif user_input == "pluss":
        num1 = float(input("Skirv inn et tall"))
        num2 = float(input("Skriv inn et til"))
        result = str(num1 + num2)
        print("Svaret er " + result)
    elif user_input == "minus":
        num1 = float(input("Skirv inn et tall"))
        num2 = float(input("Skriv inn et til"))
        result = str(num1 + num2)
        print("Svaret er " + result)
    elif user_input == "gange":
        num1 = float(input("Skirv inn et tall"))
        num2 = float(input("Skriv inn et til"))
        result = str(num1 + num2)
        print("Svaret er " + result)
    elif user_input == "dele":
        num1 = float(input("Skirv inn et tall"))
        num2 = float(input("Skriv inn et til"))
        result = str(num1 + num2)
        print("Svaret er " + result)
    else:
        print("Ugyldig input")
