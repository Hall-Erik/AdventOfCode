from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from tqdm import tqdm

if __name__ == '__main__':
    print('Fitting model...')
    order = [
        [1, 3, 6, 10, 15, 21],
        [2, 5, 9, 14, 20],
        [4, 8, 13, 19],
        [7, 12, 18],
        [11, 17],
        [16]
    ]
    X = []
    y = []
    for r, row in enumerate(order[:5]):
        for c, col in enumerate(row[:5]):
            X.append([r, c])
            y.append(col)

    reg = LinearRegression()
    poly = PolynomialFeatures(degree=4)
    X_poly = poly.fit_transform(X)
    reg.fit(X_poly, y)

    print('Predicting position...')
    n = int(reg.predict(poly.fit_transform([[2947-1, 3029-1]]))[0])

    print('Generating codes...')
    code = 20151125 # first code
    for i in tqdm(range(0, n)):
        code = (code * 252533) % 33554393
        
    print(f'Code at row 2947, col 3029 is {code}')    